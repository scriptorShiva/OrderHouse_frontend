import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const RadioWrapper = styled.div`
  .radio__container {
    &-input {
      display: grid;
      grid-template-columns: 2fr 1fr;
      font-size: 1.3rem;
      row-gap: 10px;
      border: 1px solid grey;
      margin: 10px 0;
      padding: 10px;
      &-label {
        display: flex;
      }
      input {
        justify-self: end;
        width: 20px;
        height: 20px;
        accent-color: ${ColorsUsed.navButtonBackground};
      }
    }
  }
`;

export default RadioWrapper;
