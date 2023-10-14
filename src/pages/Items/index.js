import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";
import ItemWrapper from "./item";
import Dropdown from "../../components/Dropdown";
import apiServices from "../../services/api.services";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import { ColorsUsed } from "../../constants/colorsUsed";
import Radio from "../../components/Radio";
import { RadioOptions } from "../../constants/radioList";
import Search from "../../components/Search";

function Items() {
  //states
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [itemsList, setItemsList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [searchItemName, setSearchItemName] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  //useEffect
  const fetchItemsList = useCallback(async () => {
    try {
      await apiServices
        .getAllItemsList(filterPrice && filterPrice)
        .then((response) => {
          setItemsList(response.data);
        });
    } catch (error) {
      toast.error(error);
    }
  }, [filterPrice]);

  const fetchCategoriesList = useCallback(async () => {
    try {
      await apiServices.getItemCategories().then((response) => {
        const optionsList = response.data.map((res) => ({
          key: res.id_categories,
          value: res.categories_name,
        }));
        setCategoryOptions(optionsList);
      });
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const fetchFilteredItemsByCategory = useCallback(async (id) => {
    try {
      await apiServices.fetchItemsBasedOnCategoryId(id).then((response) => {
        setFilterItems(response.data);
      });
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const searchItems = useCallback(
    async (rating, itemName) => {
      try {
        await apiServices.searchItems(rating, itemName).then((response) => {
          response.data.length > 0
            ? setFilterItems(response.data)
            : setFilterItems(itemsList);
        });
      } catch (error) {
        toast.error(error);
      }
    },
    [itemsList]
  );

  useEffect(() => {
    fetchItemsList();
    fetchCategoriesList();
  }, [fetchItemsList, fetchCategoriesList]);

  useEffect(() => {
    if (selectedOption) {
      fetchFilteredItemsByCategory(selectedOption);
    } else {
      setFilterItems(itemsList);
    }
  }, [fetchFilteredItemsByCategory, itemsList, selectedOption]);

  const radioChangeHandler = (e) => {
    setRatingValue(e.target.value);
    searchItems(e.target.value, searchItemName);
  };
  const handleSearch = (searchWords) => {
    setSearchItemName(searchWords);
    searchItems(ratingValue, searchWords);
  };

  const renderItems = () => {
    return filterItems.map((item) => (
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
          // onClick: () => cardButtonHandler(restaurant.id_restaurant),
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
    <div>
      <Layout>
        <ItemWrapper>
          <div className="items">
            <div className="items__filter">
              <div className="items__filter-search">
                <p className="items__filter-search-title">Filter Items</p>
                <div className="search">
                  <Search handleSearch={handleSearch} />
                </div>
                <div className="radio">
                  <p className="radio__label">Rating :</p>
                  <Radio
                    options={RadioOptions}
                    name={"ratingGroup"}
                    handleRadioChange={radioChangeHandler}
                  />
                </div>
                <div className="sort">
                  <span onClick={() => setFilterPrice("ASC")}>High to low</span>
                  <span onClick={() => setFilterPrice("DESC")}>
                    Low to high
                  </span>
                </div>
              </div>
            </div>
            <div className="items__list">
              <div className="items__list-dropdown">
                <div className="items__list-dropdown-container">
                  <Dropdown
                    options={categoryOptions}
                    onChange={(item) => setSelectedOption(item)}
                    selectedKey={selectedOption}
                    placeholder={"Search based on category..."}
                    open={open}
                    setOpen={setOpen}
                    className="dropdown-component"
                  />
                </div>
              </div>
              <div className="items__list-render-items">{renderItems()}</div>
            </div>
          </div>
        </ItemWrapper>
      </Layout>
    </div>
  );
}

export default Items;
