import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";
import useFavorite from "../../hook/useFavorite";

function ProductItem(props) {
  const favItems = useSelector((state) => state.localFavorite);
  const { productNo } = props.product;
  const updateFav = useFavorite(props.product);

  const [isImageChange, setIsImageChange] = useState(false);
  const imageChangeHandler = function () {
    setIsImageChange((prevState) => !prevState);
  };

  const updateFavHandler = function () {
    updateFav();
  };

  return (
    <>
      <div className={styles.product_item__container}>
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
            onClick={updateFavHandler}
            className={`favorite ${styles.product_item__favorite} ${
              favItems.some((item) => item.productNo === productNo) &&
              "fav__active"
            }`}
          >
            <ion-icon name="heart"></ion-icon>
          </button>
        </div>
        <div className={styles.product_item__info}>
          <p>{props.product.title}</p>
          <p
            className={styles.product_item__info_price}
          >{`${props.product.price} TWD`}</p>
        </div>
      </div>
    </>
  );
}
export default ProductItem;
