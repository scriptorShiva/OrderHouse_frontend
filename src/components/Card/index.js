import Badge from "./components/Badge";
import Button from "../Button";
import { CardWrapper } from "./card";
import Rating from "../Rating";

const Card = ({
  badge,
  image,
  title,
  subTitle,
  description,
  addToCartButton,
  productDetailsButton,
  price,
  ratingValue,
}) => {
  return (
    <>
      <CardWrapper>
        <article className="card__container">
          <div className="card__badge">
            {badge && (
              <Badge
                text={badge.text}
                filled={badge.filled}
                bgcolor={badge.bgcolor}
                textStyle={badge.textStyle}
              />
            )}
          </div>
          <div className="card__image">
            {image && <img src={image} alt="title" />}
          </div>
          <div className="card__content">
            <div className="card__title">{title}</div>
            <div className="card__description">{description}</div>
            <div className="card__price-rating">
              {price && <div className="price">{`₹ ${price}`}</div>}
              {ratingValue && ratingValue !== 0 ? (
                <div className="rating">
                  <Rating value={ratingValue} maxValue={5} />
                </div>
              ) : null}
            </div>
          </div>
          <div className="card__button">
            {addToCartButton && (
              <Button
                filled={addToCartButton.filled}
                btnTitle={addToCartButton.btnTitle}
                bgcolor={addToCartButton.bgcolor}
                btnStyle={addToCartButton.btnStyle}
                onClick={addToCartButton.onClick}
              />
            )}
            {productDetailsButton && (
              <Button
                filled={productDetailsButton.filled}
                btnTitle={productDetailsButton.btnTitle}
                bgcolor={productDetailsButton.bgcolor}
                btnStyle={productDetailsButton.btnStyle}
                onClick={productDetailsButton.onClick}
              />
            )}
          </div>
        </article>
      </CardWrapper>
    </>
  );
};
export default Card;
