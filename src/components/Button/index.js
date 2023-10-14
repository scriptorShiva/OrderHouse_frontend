import { ButtonWrapper } from "./button";

const Button = ({ btnTitle, filled, bgcolor, onClick, btnStyle, disabled }) => {
  return (
    <>
      <ButtonWrapper filled={filled} bgcolor={bgcolor} disabled={disabled}>
        <button
          disabled={disabled}
          className="button"
          onClick={onClick}
          style={btnStyle}>
          {btnTitle}
        </button>
      </ButtonWrapper>
    </>
  );
};
export default Button;
