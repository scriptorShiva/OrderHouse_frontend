import styled from "styled-components";

export const CardWrapper = styled.div`
  .card__ {
    &container {
      background-color: white;
      width: 350px;
      max-height: content-fit;
      box-shadow: 1px 1px 20px lightgrey;
      border-radius: 10px;
      padding: 10px 20px;
      flex-wrap: 1;
    }
    &image {
      padding: 10px 0;
      img {
        object-fit: cover;
        width: 100%;
        max-width: 100%;
        aspect-ratio: 16/12;
      }
    }
    &content {
      text-align: left;
      margin: 1rem 0;

      .card__title {
        font-size: 20px;
        font-weight: bold;
      }
      .card__description {
        padding: 10px 0;
      }
      .card__price-rating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          font-size: 18px;
          font-weight: bold;
        }
        .rating {
          display: flex;
        }
      }
    }
    &button {
      margin: 0;
      display: grid;
      row-gap: 10px;
    }
  }
`;
