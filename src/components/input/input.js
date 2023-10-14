import styled from "styled-components";

const InputWrapper = styled.span`
  .input {
    &__container {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px;
      width: ${(props) => (props.inputWidth ? props.inputWidth : `100%`)};
      &__label {
        &-icon {
          color: #0088a9;
        }
      }
      &-tag {
        padding: 5px;
        font-size: 20px;
        border-bottom: 2px solid #b3b3b3;
        width: 100%;
      }
      &-tag:focus {
        outline: none;
        border-bottom: 2px solid #0088a9;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      }
      &__label-two {
        cursor: pointer;
        background-color: white;
        &-icon {
          color: #0088a9;
          cursor: pointer;
        }
      }
    }
    &__error {
      color: red;
      margin-left: 50px;
    }
  }
`;
export default InputWrapper;
