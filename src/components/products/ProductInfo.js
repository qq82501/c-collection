import { useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import styles from "./ProductInfo.module.css";
import useFavorite from "../../hook/useFavorite";
import BtnAddCart from "../UI/BtnAddCart";
import useAddCart from "../../hook/useAddCart";

function ProductInfo(props) {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const favItems = useSelector((state) => state.localFavorite);
  const { addToCartHandler, error, setErrorHandler } = useAddCart(
    props.product
  );

  if (error) console.error(error);

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

  const specSelectHandler = function (e) {
    const spec = e.target.value;
    setErrorHandler(null);
    setSelectedSpec(spec);
  };

  const quantityHandler = function (e) {
    const quantity = +e.target.value;
    setQuantity(quantity);
  };

  const specRadios =
    product.spec &&
    product.spec.map((spec) => (
      <label
        key={spec}
        className={`${styles.spec_radio__label} ${
          spec === selectedSpec && styles.spec_selected
        } `}
      >
        <span>{spec}</span>
        <input
          className={styles.spec_radio}
          type="radio"
          name="spec"
          value={spec}
          onClick={specSelectHandler}
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
            <div className={`${error && styles.invalid}`}>
              <span className={styles.error_message}>{error}</span>
              <label>規格:</label>
              <div className={styles.spec_radio__box}>{specRadios}</div>
            </div>
          )}
          <div>
            <label htmlFor="quantity">數量: </label>

            <select id="quantity" onChange={quantityHandler} required>
              {options}
            </select>
          </div>
        </div>
        <BtnAddCart
          onClick={addToCartHandler.bind(null, null, selectedSpec, quantity)}
        />
      </Form>
    </div>
  );
}

export default ProductInfo;
