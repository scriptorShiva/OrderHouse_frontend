import React from "react";
import InputWrapper from "./input";

function Input({
  type,
  placeholder,
  name,
  iconOne,
  iconTwo,
  handleChange,
  inputValue,
  errorMsg,
  inputWidth,
}) {
  return (
    <InputWrapper className="input" inputWidth={inputWidth}>
      <div className="input__container">
        <label htmlFor={name} className="input__container__label">
          {iconOne && (
            <span className="input__container__label-icon">{iconOne}</span>
          )}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleChange}
          value={inputValue}
          className="input__container-tag"
        />
        <label htmlFor={name} className="input__container__label-two">
          {iconTwo && (
            <span className="input__container__label-icon">{iconTwo}</span>
          )}
        </label>
      </div>
      <div className="input__error">{errorMsg}</div>
    </InputWrapper>
  );
}

export default Input;
