import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { ColorsUsed } from "../../constants/colorsUsed";
import { ProductWrapper } from "./product";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import apiServices from "../../services/api.services";
import { toast } from "react-toastify";
import Search from "../../components/Search";
import NoDataFound from "../ErrorPages/NoDataFound";

function Products() {
  const navigate = useNavigate();
  //states
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const [filteredRestaurantDetails, setFilteredRestaurantDetails] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterFound, setIsFilterFound] = useState(true);

  //cart button handler
  const cardButtonHandler = (id) => {
    navigate(`/single/${id}`);
  };

  const fetchRestaurantDetails = async () => {
    setIsLoading(true); //doubt
    try {
      await apiServices.getRestaurantList().then((response) => {
        setRestaurantDetails(response.data);
        setFilteredRestaurantDetails(response.data);
      });
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch restaurant data");
    }
  };
  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const handleSearch = (searchWord) => {
    const filteredData = restaurantDetails.filter((restaurant) =>
      restaurant.restaurant_name
        .toLowerCase()
        .includes(searchWord.toLowerCase())
    );
    if (filteredData.length > 0) {
      setFilteredRestaurantDetails(filteredData);
    } else {
      setIsFilterFound(false);
      setFilteredRestaurantDetails([]);
    }
  };

  //render cards function
  const renderCards = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (filteredRestaurantDetails.length === 0 && !isFilterFound) {
      return <NoDataFound />;
    }

    return filteredRestaurantDetails.map((restaurant) => (
      <Card
        key={restaurant.id_restaurant}
        // badge={{
        //   text: "Badge",
        //   filled: false,
        //   bgcolor: ColorsUsed.navButtonBackground,
        //   textStyle: {
        //     color: ColorsUsed.navButtonBackground,
        //     fontWeight: "bold",
        //   },
        // }}
        productDetailsButton={{
          filled: true,
          btnTitle: "Restaurant details",
          bgcolor: ColorsUsed.navButtonBackground,
          btnStyle: {
            fontWeight: "bold",
            color: "white",
            width: "100%",
          },
          onClick: () => cardButtonHandler(restaurant.id_restaurant),
        }}
        title={restaurant.restaurant_name}
        description={restaurant.description}
        image="https://source.unsplash.com/user/c_v_r"
      />
    ));
  };

  return (
    <Layout>
      <ProductWrapper>
        <div className="cards__search-bar">
          <p>
            <span>Restaurants Available </span>
          </p>
          <Search handleSearch={handleSearch} />
        </div>
        <div className="cards__data-container">{renderCards()}</div>
      </ProductWrapper>
    </Layout>
  );
}

export default Products;
