import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const DropDownWrapper = styled.div`
  position: relative;
  .dropdown {
    &__input {
      display: flex;
      input {
        padding: 5px;
        font-size: 20px;
        border-bottom: 2px solid #b3b3b3;
        width: 100%;
        &:focus {
          outline: none;
          border-bottom: 2px solid #0088a9;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
      }

      &-arrow {
        cursor: pointer;
        color: ${ColorsUsed.navButtonBackground};
      }
    }
    &_list {
      font-size: 20px;
      background-color: white;
      position: absolute; /* Add absolute positioning to the dropdown list */
      top: 100%; /* Position the dropdown list below the input */
      left: 0;
      width: 100%;
      &-item {
        padding: 5px;
        cursor: pointer;
        border: 1px solid grey;
        &:hover {
          background: ${ColorsUsed.navButtonBackground};
          color: ${ColorsUsed.navTextColor};
        }
      }
    }
  }
`;

export default DropDownWrapper;
