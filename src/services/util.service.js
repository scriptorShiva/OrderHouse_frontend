import { useJwt as jwt } from "react-jwt";

//isLoggedIn : check by is token present
const isLoggedIn = () => {
  let data = localStorage.getItem("userToken");
  if (data === null) {
    return false;
  } else {
    return true;
  }
};
//setLocalStorage
// Inside the setLocalStorage function, next is called as a regular JavaScript function with no arguments. The specific action or code execution that should happen when next is called depends on how you intend to use this code.
const setLocalStorage = (token) => {
  localStorage.setItem("userToken", JSON.stringify(token));
};
//deleteLocalStorage or logout
const deleteLocalStorageToken = async () => {
  await localStorage.removeItem("userToken");
};
//getFromLocalStorage
const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};

// Check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      // Token is not valid or could not be decoded
      return true;
    }

    const currentTime = Date.now() / 1000; // Convert to seconds

    // Check if the token has an "exp" claim and if it's less than the current time
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      // Token has expired
      return true;
    }

    // Token is still valid
    return false;
  } catch (error) {
    // An error occurred while decoding the token
    return true;
  }
};

const UtilService = {
  setLocalStorage,
  deleteLocalStorageToken,
  getFromLocalStorage,
  isLoggedIn,
  isTokenExpired,
};

export default UtilService;
