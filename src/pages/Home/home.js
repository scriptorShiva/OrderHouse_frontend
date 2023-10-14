import styled from "styled-components";
import { ColorsUsed } from "../../constants/colorsUsed";

const HomeWrapper = styled.div`
  height: 100vh;
  background-color: #202125;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
  padding: 10% 100px;

  @media only screen and (max-width: 1500px) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;

    .home__details {
      justify-self: center;
      align-items: center;

      .welcome {
        font-size: 20px;
        color: ${ColorsUsed.navButtonBackground};
        font-weight: 500px;
      }

      .title {
        font-size: 36px;
        font-weight: bold;
        color: ${ColorsUsed.navTextColor};
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
          "Lucida Sans", Arial, sans-serif;

        &__description {
          color: ${ColorsUsed.navTextColor};
          font-size: 20px;
          font-style: italic;
        }
      }
    }

    .home__button {
      margin-top: 30px;
      width: 10rem;
    }
  }

  .home__image {
    display: flex;
    justify-content: center;
    cursor: pointer;

    .home_1 {
      position: relative;
      top: 100px;
      transition: transform 0.3s ease;
    }

    .home_2 {
      position: relative;
      bottom: 100px;
      transition: transform 0.3s ease;
    }

    &:hover {
      .home_1 {
        transform: translateY(-100px);
      }

      .home_2 {
        transform: translateY(100px);
      }
    }
  }

  .home__details {
    align-self: center;
    display: grid;

    .welcome {
      font-size: 20px;
      color: ${ColorsUsed.navButtonBackground};
      font-weight: 500px;
    }

    .title {
      font-size: 36px;
      font-weight: bold;
      color: ${ColorsUsed.navTextColor};
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;

      &__description {
        color: ${ColorsUsed.navTextColor};
        font-size: 20px;
        font-style: italic;
      }
    }
  }

  .home__button {
    margin-top: 30px;
    width: 10rem;
  }
`;

export default HomeWrapper;
