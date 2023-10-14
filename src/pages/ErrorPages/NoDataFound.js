import React from "react";
import styled from "styled-components";
import No_Data from "../../assets/images/No_Data.png";
import { RiErrorWarningFill } from "react-icons/ri";

const NoDataFoundWrapper = styled.div`
  display: grid;
  width: 90vw;
  justify-items: center;

  .no-data__wrapper {
    width: 500px;
    .no__data {
      display: flex;
      align-items: center;
      justify-content: center;
      color: orange;
      &-title {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
      }
    }
  }
`;

function NoDataFound() {
  return (
    <NoDataFoundWrapper>
      <div className="no-data__wrapper">
        <img src={No_Data} alt="no-data" />
        <span className="no__data">
          <RiErrorWarningFill size={25} />
          <p className="no__data-title">No data found !</p>
        </span>
      </div>
    </NoDataFoundWrapper>
  );
}

export default NoDataFound;
