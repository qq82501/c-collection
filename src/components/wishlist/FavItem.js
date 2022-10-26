import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FavItem.module.css";
import useFavorite from "../../hook/useFavorite";
import SpecSelector from "./SpecSelector";

function FavItem(props) {
  const { productNo } = props.product;
  const updateFav = useFavorite(props.product);
  const spec = props.product.spec || [];

  const [isImageChange, setIsImageChange] = useState(false);
  const imageChangeHandler = function () {
    setIsImageChange((prevState) => !prevState);
  };

  const updateFavHandler = function () {
    updateFav();
  };

  const addToCartHandler = function () {
    console.log("ADD TO CART");
  };

  return (
    <>
      <div className={`${styles.product_item__container} ${props.className}`}>
        <div className={styles.product_item__img_box}>
          <Link to={`/productDetail/${productNo}`} className="link">
            <img
              alt="product"
              className={styles.product_item__img}
              onMouseEnter={imageChangeHandler}
              onMouseLeave={imageChangeHandler}
              src={require(`../../images/products/${productNo}/${
                isImageChange ? "02" : "01"
              }.jpg`)}
            />
          </Link>
          <button
            className={`favorite ${styles.fav_item__close} `}
            onClick={updateFavHandler}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
          {/* <button
            onClick={updateFavHandler}
            className={`favorite ${styles.product_item__favorite} ${
              favItems.some((item) => item.productNo === productNo) &&
              "fav__active"
            }`}
          >
            <ion-icon name="heart"></ion-icon>
          </button> */}
        </div>
        <div className={styles.product_item__info}>
          <p>{props.product.title}</p>
          <p
            className={styles.product_item__info_price}
          >{`${props.product.price} TWD`}</p>
          <SpecSelector
            product={props.product}
            onClick={spec.length ? props.onClick : addToCartHandler}
            onAddToCart={addToCartHandler}
          />
        </div>
      </div>
    </>
  );
}
export default FavItem;
