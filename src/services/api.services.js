//all api calls
import axios from "axios";
import AuthServices from "./auth.service";
import axiosInterceptor from "./axiosInterceptor";

const BASE_URL = "http://localhost:5000/api";

function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      return `Request failed with status code ${error.response.status}: ${error.response.data.message}`;
    } else if (error.request) {
      // The request was made, but no response was received (e.g., network error)
      return "Network error";
    } else {
      // Something else happened while setting up the request or processing the response
      return "An error occurred";
    }
  } else {
    // Handle non-Axios errors (if any)
    return error.message || "An error occurred";
  }
}

async function userDetails(access_token) {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    const response = await axiosInterceptor.get(BASE_URL + "/me", config);

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data.message };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, but continue processing the error
      return { success: false, data: error.response.data.message };
    } else {
      const errorMessage = getErrorMessage(error);
      // Handle other errors or provide feedback to the user
      return { success: false, error: errorMessage };
    }
  }
}

const getRestaurantList = () => {
  return axios.get(BASE_URL + `/restaurant`).then((response) => {
    return response.data;
  });
};

const getItemListBasedOnRestaurant = (id) => {
  return axios.get(BASE_URL + `/restaurant/menu/${id}`).then((response) => {
    return response.data;
  });
};

const getRestaurantDetailsBasedOnId = (id) => {
  return axios
    .get(BASE_URL + `/restaurant/${id}`, {
      headers: {
        Authorization: `Bearer ${AuthServices.getFromLocalStorage()}`,
        roles: 1,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getAllItemsList = (sort) => {
  return axios
    .get(BASE_URL + `/item`, {
      params: {
        "sort[price]": sort,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getItemCategories = () => {
  return axios.get(BASE_URL + `/categories`).then((response) => {
    return response.data;
  });
};

const fetchItemsBasedOnCategoryId = (id) => {
  return axios.get(BASE_URL + `/categories/detail/${id}`).then((response) => {
    return response.data;
  });
};

const searchItems = (ratingValue, searchItemName) => {
  console.log(ratingValue, searchItemName);
  return axios
    .get(BASE_URL + `/item/search`, {
      params: {
        rating: ratingValue,
        name: searchItemName,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const addToCart = (item_id, user_id, quantity) => {
  return axios
    .post(BASE_URL + "/cart", {
      item_id,
      user_id,
      quantity,
    })
    .then((response) => {
      return response.data;
    });
};

const apiServices = {
  userDetails,
  getRestaurantList,
  getItemListBasedOnRestaurant,
  getRestaurantDetailsBasedOnId,
  getAllItemsList,
  getItemCategories,
  fetchItemsBasedOnCategoryId,
  searchItems,
  addToCart,
};

export default apiServices;
