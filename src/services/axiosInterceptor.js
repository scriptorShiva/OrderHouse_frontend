import axios from "axios";
import UtilService from "./util.service";
import auth from "./auth.service";

//creates a new instance of the Axios library in JavaScript, which you can customize with specific settings like base URL and headers for making HTTP requests. This is helpful when you want to have different configurations for different parts of your application.
const instance = axios.create({
  // add in env
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// add request interceptor
//Interceptors allow you to modify outgoing requests before they are sent.
instance.interceptors.request.use(
  (config) => {
    // Get the token from your storage
    const token = UtilService.getFromLocalStorage("access_token");

    // without check isTokenExpired it also works smae I guess : think it

    if (token && !UtilService.isTokenExpired(token)) {
      // Set the token in the request header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add response interceptor ..Interceptors allow you to modify incoming responses before they are passed to the application.
// The response interceptor checks if the response status code is 401 (unauthorized). If it is, it suggests handling token expiration or unauthorized access. This is a common scenario where you might want to log the user out or refresh their authentication token.It also handles other errors and returns a rejected Promise.

const pendingRequests = [];
function enqueueRequest(requestConfig) {
  pendingRequests.push(requestConfig);
}

async function processPendingRequests(accessToken) {
  const requests = [...pendingRequests];

  pendingRequests.length = 0;

  const results = await Promise.all(
    requests.map(async (requestConfig) => {
      requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;
      try {
        const response = await instance(requestConfig);
        return response;
      } catch (error) {
        // Handle errors for individual requests if needed
        console.error("Error processing request:", error);
        throw error; // Rethrow the error to be handled later
      }
    })
  );

  return results;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // by this you can put condition on url with uses interceptors after getting response which not
    const originalRequest = error.config;
    // originalRequest.url !== '/login';

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // explanation given below  why it is set to true
      originalRequest._retry = true;
      // Handle token expiration or unauthorized access
      // You can add your logic here to refresh the token or log the user out
      try {
        // Refresh the access token using a request to your refresh token endpoint
        const refreshTokenFromCookie =
          await auth.getRefreshTokenFromHttpCookie();

        if (refreshTokenFromCookie) {
          // getting new pair of refresh and access token
          const res = await instance.post(
            "/refresh-rotation",
            {
              refresh_token: refreshTokenFromCookie,
            },
            {
              withCredentials: true,
            }
          );
          if (res) {
            const newAccessToken = res.data.access_token;

            if (newAccessToken) {
              // set new access token
              UtilService.setLocalStorage(newAccessToken);

              // Enqueue the failed request
              enqueueRequest(originalRequest);

              // Process pending requests with the new access token
              const results = await processPendingRequests(newAccessToken);

              // Return the response for the original request
              return results[0];
            }
          }
        }
      } catch (_error) {
        if (
          _error?.response?.status === 400 ||
          _error?.response?.status === 401
        ) {
          // delete tokens and back to login page
          await auth.onLogOut();
          // redirect to login page
          window.location.replace("http://localhost:3000/login");
        }
        return Promise.reject(_error);
      }
    } else {
      console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  }
);

export default instance;
// on import we can give any name to defaut exports
/**
 * about .retry -----
 * When a response with a status code of 401 (Unauthorized) is received, the code checks if _retry is not already set to true. This check ensures that the request is only retried once.
If _retry is not set to true, it means the request hasn't been retried yet. In this case, _retry is set to true, indicating that a retry attempt is being made.
After setting _retry to true, the code attempts to refresh the access token.
If the access token refresh is successful, it retries the original request using axiosInstance(originalConfig). Since _retry is now true, the interceptor won't attempt to retry the request again if another 401 error occurs during the retry.
The purpose of this mechanism is to prevent an infinite loop of retry attempts for the same request when there's an issue like an expired access token. It ensures that the request is retried once, and if the issue persists, it can be handled accordingly, such as by logging the user out and redirecting them to the login page, as seen in the code.
 */
