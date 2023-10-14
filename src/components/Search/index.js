import React from "react";
import { SearchWrapper } from "./search";
import Input from "../input";
import { ImSearch as SearchIcon } from "react-icons/im";
// import { MdOutlineClear as CrossIcon } from "react-icons/md";

function Search({ handleSearch }) {
  const handleChange = (event) => {
    const searchWord = event.target.value;
    handleSearch(searchWord);
  };

  return (
    <SearchWrapper>
      <div className="searchInputs">
        <Input
          iconOne={<SearchIcon size={25} />}
          // iconTwo={<CrossIcon size={35} />}
          inputwidth={"500px"}
          name="username"
          type="text"
          placeholder="Search..."
          handleChange={handleChange}
        />
      </div>
      <div className="search-list"></div>
    </SearchWrapper>
  );
}

export default Search;
