import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import styles from "./ProductInfo.module.css";
import useFavorite from "../../hook/useFavorite";
import BtnAddCart from "../UI/BtnAddCart";

function ProductInfo(props) {
  const favItems = useSelector((state) => state.localFavorite);

  const { product } = props;

  const updateFav = useFavorite(product);
  const updateFavHandler = function () {
    updateFav();
  };

  const optionArr = Array.from({ length: 10 }, (cur, i) => i + 1);
  const options = optionArr.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  const specRadios =
    product.spec &&
    product.spec.map((spec) => (
      <label key={spec} className={styles.spec_radio__label}>
        <span>{spec}</span>
        <input
          className={styles.spec_radio}
          type="radio"
          name="spec"
          value={spec}
        />
      </label>
    ));

  return (
    <div className={styles.product_info__container}>
      <div className={styles.product_info__text_box}>
        <p className={styles.product_info_title}>{product.title}</p>
        <button
          className={`${styles.product_info__favorite} favorite ${
            favItems.some((item) => item.productNo === product.productNo) &&
            "fav__active"
          }`}
          onClick={updateFavHandler}
        >
          <ion-icon name="heart"></ion-icon>
        </button>
        <p className={styles.product_info_price}>{`${product.price} TWD`}</p>
      </div>
      <Form className={styles.form__purchase}>
        <div className={styles.purchase__form_box}>
          {product.spec && (
            <div>
              <label>規格:</label>
              <div className={styles.spec_radio__box}>{specRadios}</div>
            </div>
          )}
          <div>
            <label htmlFor="quantity">數量: </label>
            <select id="quantity">{options}</select>
          </div>
        </div>
        <BtnAddCart />
      </Form>
    </div>
  );
}

export default ProductInfo;
