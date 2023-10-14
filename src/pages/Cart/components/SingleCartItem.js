import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { ColorsUsed } from "../../../constants/colorsUsed";

const SingleCartItemWrapper = styled.div`
  margin: 100px 300px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  .item {
    &__details {
      display: grid;
      grid-template-columns: 200px auto;
      column-gap: 15px;
      &-img {
        /* width: 200px; // makes image unresponsive */
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &-description {
        align-self: center;
        span {
          font-weight: bold;
        }
      }
    }
    &__buttons {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      justify-items: center;
      &-qty {
        justify-self: center;
      }
    }
    &__amount {
      align-self: center;
      justify-self: center;
    }
    &__delete-button {
      align-self: center;
      justify-self: center;
    }
  }
`;
function SingleCartItem() {
  return (
    <SingleCartItemWrapper>
      <div className="item__details">
        <div className="item__details-img">
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            alt=""
          />
        </div>
        <div className="item__details-description">
          <p className="item-name">
            <span>Restaurant : </span>
          </p>
          <p className="item-name">
            <span>Item :</span>
          </p>
        </div>
      </div>
      <div className="item__buttons">
        {/* how to handle without empty div */}
        <div></div>
        <Button
          filled={true}
          bgcolor={ColorsUsed.navButtonBackground}
          btnTitle="+"
          btnStyle={{
            color: ColorsUsed.navTextColor,
            fontSize: "22px",
            padding: " 5px 20px",
            borderRadius: "40%",
          }}
        />
        <span className="item__buttons-qty">10</span>
        <Button
          filled={true}
          bgcolor={ColorsUsed.navButtonBackground}
          btnTitle="-"
          btnStyle={{
            color: ColorsUsed.navTextColor,
            fontSize: "22px",
            padding: " 5px 20px",
            borderRadius: "40%",
          }}
        />
        <div></div>
      </div>
      <div className="item__amount">
        <p>$398</p>
      </div>
      <div className="item__delete-button">
        <Button
          filled={true}
          bgcolor={ColorsUsed.navButtonBackground}
          btnTitle="Delete"
          btnStyle={{
            fontWeight: "bold",
            color: ColorsUsed.navTextColor,
            padding: " 10px 20px",
          }}
        />
      </div>
    </SingleCartItemWrapper>
  );
}

export default SingleCartItem;
