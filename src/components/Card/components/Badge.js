import styled from "styled-components";

export const BadgeWrapper = styled.div`
  background-color: ${(props) => (props.filled ? props.bgcolor : "none")};
  max-width: max-content;
  padding: 10px;
  border: ${(props) => (props.filled ? "none" : `2px solid ${props.bgcolor}`)};
`;

const Badge = ({ text, filled, bgcolor, textStyle }) => {
  return (
    <>
      <BadgeWrapper filled={filled} bgcolor={bgcolor}>
        <span className={"badge__title"} style={textStyle}>
          {text}
        </span>
      </BadgeWrapper>
    </>
  );
};
export default Badge;
