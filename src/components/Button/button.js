import styled from "styled-components";

export const ButtonWrapper = styled.div`
  .button {
    background-color: ${(props) => (props.filled ? props.bgcolor : "white")};
    font-size: 16px;
    display: block;
    border-radius: 5px;
    width: fit-content;
    padding: 10px;
    border: ${(props) =>
      props.filled ? "none" : `2px solid ${props.bgcolor}`};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  }
`;
