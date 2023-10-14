import React, { useState, useEffect } from "react";
import DropDownWrapper from "./dropdown";
import { HiArrowCircleDown as ArrowDownIcon } from "react-icons/hi";
import { RxCross2 as CrossIcon } from "react-icons/rx";

function Dropdown({
  placeholder,
  onChange,
  selectedKey,
  open,
  setOpen,
  options,
}) {
  //options
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  //default value setting
  useEffect(() => {
    if (selectedKey) {
      setInputValue(options.find((o) => o.key === selectedKey).value);
    }
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [selectedKey, options, inputValue]);

  const onItemSelected = (option) => {
    onchange !== undefined && onChange(option.key);
    onchange !== undefined && setInputValue(option.value);
    setOpen(false);
  };
  const clearDropdown = () => {
    setInputValue("");
    onChange("");
  };
  const hideDropdownList = () => {
    setOpen((curr) => !curr);
  };
  const onInputChange = (e) => {
    setInputValue(e.target.value);
    setFilteredOptions(
      options.filter((option) =>
        option.value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  return (
    <DropDownWrapper>
      <div className="dropdown">
        <div className="dropdown__input">
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          {inputValue || selectedKey ? (
            <div className="dropdown__input-arrow" onClick={clearDropdown}>
              <CrossIcon size={35} />
            </div>
          ) : null}
          <div className="dropdown__input-arrow" onClick={hideDropdownList}>
            <ArrowDownIcon size={35} />
          </div>
        </div>
        {open && (
          <div className="dropdown_list">
            {filteredOptions.map((option) => (
              <div
                key={option.key}
                onClick={() => onItemSelected(option)}
                className="dropdown_list-item"
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <label for="cars">Choose a car:</label>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
        <option>--No options --</option>
      </select> */}
    </DropDownWrapper>
  );
}

export default Dropdown;
