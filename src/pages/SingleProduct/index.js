import React, { useEffect, useState, useCallback, useContext } from "react";
// import ImageSlider from "../../components/ImageSlider";
import SingleProductWrapper from "./singleProduct";
import Card from "../../components/Card";
import { ColorsUsed } from "../../constants/colorsUsed";
import apiServices from "../../services/api.services";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import Search from "../../components/Search";
import NoDataFound from "../ErrorPages/NoDataFound";
import { CartContext } from "../../context/CartContext";
// const imagesList = [
//   "https://images.freeimages.com/images/large-previews/dc9/pennybacker-bridge-1636714.jpg",
//   "https://images.freeimages.com/images/large-previews/f6f/ice-winter-frost-ice-floe-cold-icicles-fence-fence-railing-1636328.jpg",
//   "https://images.freeimages.com/images/large-previews/a99/free-image-for-you-seo-or-web-marketing-blog-or-site-1636066.jpg",
//   "https://images.freeimages.com/images/large-previews/855/towards-the-atlantic-1635707.jpg",
// ];

function SingleProduct() {
  //states
  const [itemList, setItemList] = useState([]);
  const [filterItemList, setFilterItemList] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [isFilterFound, setIsFilterFound] = useState(true);

  // cart context
  const { cart, setCart } = useContext(CartContext);

  //get itemList list
  let { restaurantId } = useParams();
  //1st way
  // useEffect(() => {
  //   const fetchRestaurantDetails = async () => {
  //     try {
  //       await apiServices
  //         .getRestaurantDetailsBasedOnId(restaurantId)
  //         .then((response) => {
  //           setRestaurantName(response.data.restaurant_name);
  //         });
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };

  //   const fetchItemList = async () => {
  //     try {
  //       await apiServices
  //         .getItemListBasedOnRestaurant(restaurantId)
  //         .then((response) => {
  //           setItemList(response.data);
  //         });
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     await fetchItemList();
  //     await fetchRestaurantDetails();
  //   };

  //   fetchData();
  // }, [restaurantId]);

  //2nd way
  const fetchRestaurantDetails = useCallback(async () => {
    try {
      await apiServices
        .getRestaurantDetailsBasedOnId(restaurantId)
        .then((response) => {
          setRestaurantName(response.data.restaurant_name);
        });
    } catch (error) {
      toast.error(error);
    }
  }, [restaurantId]);

  const fetchItemList = useCallback(async () => {
    try {
      await apiServices
        .getItemListBasedOnRestaurant(restaurantId)
        .then((response) => {
          setItemList(response.data);
          setFilterItemList(response.data);
        });
    } catch (error) {
      toast.error(error);
    }
  }, [restaurantId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchItemList();
      await fetchRestaurantDetails();
    };

    fetchData();
  }, [fetchItemList, fetchRestaurantDetails]);

  //handle search
  const handleSearch = (searchword) => {
    const filteredData = itemList.filter((item) => {
      return item.item_name.toLowerCase().includes(searchword.toLowerCase());
    });
    if (filteredData.length > 0) {
      setFilterItemList(filteredData);
    } else {
      setIsFilterFound(false);
      setFilterItemList([]);
    }
  };

  //add to cart funcitonality
  const addToCart = (product, e) => {
    // copy existing cart items that comes from context state that we made in app.js
    //I have clone that cart if we modify directly then original cart will change because in js object are passed by refrence
    let _cart = { ...cart }; //empty initally
    if (!_cart.items) {
      //if key not present then add it to cart
      _cart.items = {};
    }
    if (_cart.items[product.id_item]) {
      //if item present hen update quantity
      _cart.items[product.id_item] += 1;
    } else {
      //if not present then add key and insitilaize with 1
      _cart.items[product.id_item] = 1;
    }
    //update total items
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    //set modified cart
    setCart(_cart);
  };

  //render cards
  const renderCards = () => {
    if (filterItemList.length === 0 && !isFilterFound) {
      return <NoDataFound />;
    }
    return filterItemList.map((item) => (
      <Card
        key={item.id_item}
        badge={{
          text: `${item.categories_name}`,
          filled: false,
          bgcolor: ColorsUsed.navButtonBackground,
          textStyle: {
            color: ColorsUsed.navButtonBackground,
            fontWeight: "bold",
          },
        }}
        productDetailsButton={{
          filled: true,
          btnTitle: "Item details",
          bgcolor: ColorsUsed.navButtonBackground,
          btnStyle: {
            fontWeight: "bold",
            color: "white",
            width: "100%",
          },
          // onClick: () => cardButtonHandler(restaurant.id_restaurant),
        }}
        addToCartButton={{
          filled: true,
          btnTitle: "Add to Cart",
          bgcolor: ColorsUsed.navButtonBackground,
          btnStyle: {
            fontWeight: "bold",
            color: "white",
            width: "100%",
          },
          onClick: () => addToCart(item),
        }}
        title={item.item_name}
        description={item.description}
        price={item.price}
        ratingValue={item.rating}
        image="https://source.unsplash.com/user/c_v_r"
      />
    ));
  };

  return (
    <Layout>
      <SingleProductWrapper>
        <div className="items__section">
          <div className="items__section_search-wrapper">
            <p className="items__section-title">
              <span>{restaurantName} Restaurant</span>
            </p>
            <Search handleSearch={handleSearch} />
          </div>
          <div className="items__section-list">{renderCards()}</div>
        </div>
      </SingleProductWrapper>
    </Layout>
  );
}

export default SingleProduct;
