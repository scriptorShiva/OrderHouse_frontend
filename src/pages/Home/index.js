import React from "react";
import Layout from "../../components/Layout";
import HomeWrapper from "./home";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { ColorsUsed } from "../../constants/colorsUsed";
import Home_1 from "../../assets/images/Home_1.png";
import Home_2 from "../../assets/images/Home_2.png";

function Home() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/restaurants");
  };

  return (
    <Layout>
      <HomeWrapper>
        <div className="home__details">
          <p className="welcome">Welcome</p>
          <p className="title">
            FEEL GOOD <span className="title__part">BY EATING OUR FOOD!</span>
          </p>
          <p className="title__description">
            Book your food from anytime and anywhere ...
          </p>
          <div className="home__button">
            <Button
              filled={true}
              bgcolor={ColorsUsed.navButtonBackground}
              btnTitle="Book Now"
              onClick={onClickHandler}
              btnStyle={{
                color: ColorsUsed.navTextColor,
                fontSize: "22px",
                padding: " 5px 20px",
                width: "100%",
              }}
            />
          </div>
        </div>
        <div className="home__image">
          <div className="home_1">
            <img src={Home_1} alt="home_1" />
          </div>
          <div className="home_2">
            <img src={Home_2} alt="home_2" />
          </div>
        </div>
      </HomeWrapper>
    </Layout>
  );
}

export default Home;
