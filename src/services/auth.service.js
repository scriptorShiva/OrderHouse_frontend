import axios from "axios";
import UtilService from "./util.service";

//must be in env
const BASE_URL = "http://localhost:5000/api";

// server errors
const handleErrorResponse = (error) => {
  // here we catch all server related errors  (such as network errors, server errors, etc.)
  if (error.response) {
    // The server responded with a status code outside of 2xx range
    if (error.response.status === 409) {
      return {
        success: false,
        errorMessage: "Username or email already exists.",
      };
    }

    const errorMessage = error.response.data.message || "An error occurred.";
    return { success: false, errorMessage };
  } else if (error.request) {
    // The request was made, but no response was received
    return {
      success: false,
      errorMessage: "No response received from the server.",
    };
  } else {
    // Something else triggered an error
    return {
      success: false,
      errorMessage: "An error occurred while signing up.",
    };
  }
};

const signUp = async (name, username, password, email) => {
  try {
    const response = await axios.post(BASE_URL + "/register", {
      name,
      userName: username,
      email,
      password,
      confirm_password: password,
    });

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, errorMessage: response.data.message };
    }
  } catch (error) {
    return handleErrorResponse(error);
  }
};
/**
 * CORS RELATED : withCredentials: true in your Axios request, you're essentially telling the browser to include any cookies associated with the target domain (in this case, the domain of your Node.js Express API) in the request. This is necessary when you want to perform authentication or session management using cookies because the server needs to receive the cookies to identify and authenticate the user.
 */
const login = async (email, password) => {
  try {
    const response = await axios.post(
      BASE_URL + "/login",
      {
        email,
        password,
      },
      {
        withCredentials: true, // Include cookies in the request : now it set cookie in browser
      }
    );
    if (response.status === 200) {
      return { success: true, accessToken: response?.data?.access_token };
    } else {
      return { success: false, errorMessage: response?.data?.message };
    }
  } catch (error) {
    return handleErrorResponse(error);
  }
};

//get refresh token from httpOnlyCookie
const getRefreshTokenFromHttpCookie = async () => {
  try {
    const res = await axios.get(BASE_URL + "/cookie-refresh-token", {
      withCredentials: true, // Include cookies in this request
    });

    if (res.status === 200) {
      return res?.data?.refreshToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching refresh token:", error);
  }
};

// logout api
const onLogOut = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${UtilService.getFromLocalStorage()}`,
      withCredentials: true,
    },
  };
  // first delete access token then refresh token deleted
  UtilService.deleteLocalStorageToken();
  try {
    const response = await axios.get(BASE_URL + "/logout", config);
    if (response.status === 200) {
      return { success: true, accessToken: response?.data?.message };
    } else {
      return { success: false, errorMessage: response?.data?.message };
    }
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const authService = {
  signUp,
  login,
  getRefreshTokenFromHttpCookie,
  onLogOut,
};

export default authService;
