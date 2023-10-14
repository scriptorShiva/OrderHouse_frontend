import React from "react";
import RadioWrapper from "./radio";

function Radio({ options, name, handleRadioChange }) {
  return (
    <RadioWrapper>
      <div className="radio__container">
        {options.map((option, index) => (
          <div className="radio__container-input">
            <label className="radio__container-input-label" htmlFor={index}>
              {" "}
              {option.label}
            </label>
            <input
              type="radio"
              name={name}
              value={option.value}
              key={index}
              id={index} //its for htmlFor
              disabled={false}
              onChange={handleRadioChange}
            />
          </div>
        ))}
      </div>
    </RadioWrapper>
  );
}

export default Radio;
