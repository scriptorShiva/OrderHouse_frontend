import styled from "styled-components";

const ImageSliderWrapper = styled.div`
  .slider {
    width: 100%;
    height: 100%;
    &__images {
      display: flex;
      overflow: hidden;

      img {
        object-fit: cover;
      }
      &-buttons {
        width: 100%;
        display: flex;
        position: absolute;

        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        z-index: 10;
      }
      &-current {
        width: 100%;
        display: flex;
        position: absolute;
        align-items: flex-end;
        justify-content: center;
        gap: 40px;
        padding-bottom: 20px;
        z-index: 5;
        &-circle {
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 100%;
        }
        &-circle-color {
          width: 20px;
          height: 20px;
          background-color: purple;
          border-radius: 100%;
        }
      }
    }
  }
`;

export default ImageSliderWrapper;
