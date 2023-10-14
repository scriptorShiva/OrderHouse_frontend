import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const ItemWrapper = styled.div`
  margin: 100px 50px;

  .items {
    display: grid;
    grid-template-columns: 1fr 3fr;
    &__filter {
      padding: 10px;

      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      &-search {
        &-title {
          font-size: 2rem;
          margin-top: 10px;
          text-align: center;
          font-weight: 500px;
          border-bottom: 4px solid ${ColorsUsed.navButtonBackground};
        }
        .radio {
          &__label {
            font-size: 20px;
          }
        }
        .sort {
          border: 1px solid grey;
          padding: 0 20px;
          span {
            cursor: pointer;
            padding: 50px;
          }
        }
      }
    }

    &__list {
      display: grid;
      &-dropdown {
        padding: 10px;
        margin-bottom: 10px;
        width: 50%;
        justify-self: end;
        &-container {
        }
      }

      &-render-items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
      }
    }
  }
`;

export default ItemWrapper;
