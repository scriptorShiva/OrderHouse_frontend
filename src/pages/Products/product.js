import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

export const ProductWrapper = styled.div`
  .cards__search-bar {
    margin: 100px 100px 0px 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    p {
      span {
        font-size: 2rem;
        font-weight: bold;
        border-bottom: 4px solid ${ColorsUsed.navButtonBackground};
      }
    }
  }
  .cards__data-container {
    margin: 50px 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    row-gap: 100px;
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
`;

export const NoDataFoundWrapper = styled.div`
  display: grid;
`;
