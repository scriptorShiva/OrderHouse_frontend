import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const SingleProductWrapper = styled.div`
  margin: 100px 50px;
  .items__section {
    &_search-wrapper {
      margin: 0 50px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    display: grid;
    &-title {
      span {
        font-size: 2rem;
        font-weight: bold;
        border-bottom: 5px solid ${ColorsUsed.navButtonBackground};
        padding-bottom: 1px;
      }
    }
    &-list {
      margin: 50px 0;
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(4, 1fr);
      row-gap: 20px;
      @media (max-width: 1500px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
`;

export default SingleProductWrapper;
