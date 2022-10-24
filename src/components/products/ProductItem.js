import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.css";

function ProductItem(props) {
  const [isImageChange, setIsImageChange] = useState(false);
  const imageChangeHandler = function () {
    setIsImageChange((prevState) => !prevState);
  };
  return (
    <Link
      to={`/productDetail/${props.product.productNo}`}
      className={`${styles.product_item__container} link`}
    >
      <div className={styles.product_item__img_box}>
        <img
          alt="product picture"
          className={styles.product_item__img}
          onMouseEnter={imageChangeHandler}
          onMouseLeave={imageChangeHandler}
          src={require(`../../images/products/${props.product.productNo}/${
            isImageChange ? "02" : "01"
          }.jpg`)}
        />
        <button className={styles.favorite}>
          <ion-icon name="heart"></ion-icon>
        </button>
      </div>
      <div className={styles.product_item__info}>
        <p>{props.product.title}</p>
        <p
          className={styles.product_item__info_price}
        >{`${props.product.price} TWD`}</p>
      </div>
    </Link>
  );
}
export default ProductItem;
