import styled from "styled-components";

const LoginWrapper = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 40% 60%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem;
  overflow: hidden;
  position: fixed;
  .img-wrapper {
    img {
      object-fit: cover;
      @media (max-width: 1600px) {
        display: none;
      }
    }
  }
  .register {
    display: grid;
    &__icon {
      color: #0088a9;
      justify-self: center;
    }
    &__title {
      justify-self: center;
      font-size: 30px;
      font-weight: bold;
    }
    &__input-wrapper {
      display: grid;
      gap: 10px;
    }
    &__forgotPassword {
      color: #0088a9;
      font-weight: 500;
      cursor: pointer;
      font-size: 20px;
      margin: 10px 0;
    }
  }
  @media (max-width: 1600px) {
    display: grid;
    grid-template-columns: 100%;
    /* width: 100%; */
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
`;
export default LoginWrapper;
