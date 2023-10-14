import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../Button";
import { ColorsUsed } from "../../../constants/colorsUsed";
import apiServices from "../../../services/api.services";
import UtilService from "../../../services/util.service";
import { toast } from "react-toastify";

const UserProfileWrapper = styled.div`
  z-index: 100;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .card {
    display: grid;
    &__user-details {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      .name {
        font-size: 25px;
        justify-self: center;
        color: ${ColorsUsed.navButtonBackground};
        font-weight: bold;
      }
      .username {
        font-size: 20px;
        font-style: italic;
        justify-self: center;
      }
    }
    &__logout-button {
      margin-top: 20px;
      justify-self: center;
    }
  }
`;

const DEFAULT_DATA = {
  name: "User Name",
  email: "xyz@gmail.com",
  role: "CUSTOMER",
  userName: "user name",
};

function UserProfile({ logoutHandler }) {
  const [userData, setUserData] = useState(DEFAULT_DATA);
  //get user details
  const userDetailsApi = async () => {
    try {
      const res = await apiServices.userDetails(
        UtilService.getFromLocalStorage()
      );
      if (res.success) {
        const userInfo = res.data;
        setUserData({
          name: userInfo?.name,
          email: userInfo?.email,
          role: userInfo?.role,
          userName: userInfo?.userName,
        });
      }
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    userDetailsApi();
  }, []);
  return (
    <UserProfileWrapper>
      <div className="card">
        <div className="card__user-details">
          <p className="name">{userData.name}</p>
          <p className="username">{userData.userName}</p>
          <p className="username">[{userData.role}]</p>
        </div>
        <div className="card__logout-button">
          <Button
            filled={true}
            bgcolor={ColorsUsed.navButtonBackground}
            btnTitle="Logout"
            onClick={logoutHandler}
            btnStyle={{
              color: ColorsUsed.navTextColor,
              fontSize: "20px",
              padding: " 5px 20px",
              width: "100px",
            }}
          />
        </div>
      </div>
    </UserProfileWrapper>
  );
}

export default UserProfile;
