import React, { useState } from "react";
import Button from "../Button";
import ImageSliderWrapper from "./imageSlider";

function ImageSlider({ images }) {
  const [imgIndex, setImgIndex] = useState(0);
  //functions
  const goToPrevImageHandler = () => {
    if (imgIndex > 0) {
      setImgIndex((curr) => curr - 1);
    } else {
      setImgIndex(images.length - 1);
    }
  };
  const goToNextImageHandler = () => {
    if (imgIndex < images.length - 1) {
      setImgIndex((curr) => curr + 1);
    } else {
      setImgIndex(0);
    }
  };
  return (
    <ImageSliderWrapper>
      <div className="slider__images">
        <div className="slider__images-buttons">
          <Button
            btnTitle="prev"
            filled={true}
            bgcolor={"purple"}
            btnStyle={{ color: "white" }}
            onClick={goToPrevImageHandler}
          />
          <Button
            btnTitle="next"
            filled={true}
            bgcolor={"purple"}
            btnStyle={{ color: "white" }}
            onClick={goToNextImageHandler}
          />
        </div>
        <div className="slider__images-current">
          {images.map((img, index) => (
            <span
              className={
                ("slider__images-current-circle",
                index === imgIndex && "slider__images-current-circle-color")
              }
            ></span>
          ))}
        </div>
        <img src={images[imgIndex]} alt="" />
      </div>
    </ImageSliderWrapper>
  );
}

export default ImageSlider;
