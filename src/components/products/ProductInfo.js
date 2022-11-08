import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import styles from "./ProductInfo.module.css";
import updateFav from "../../thunk/updateFavThunkAction";
import BtnAddCart from "../UI/BtnAddCart";
import useUpdateCart from "../../hook/useUpdaeCart";
import InputRadio from "../UI/InputRadio";
import Modal from "../UI/Modal";

function ProductInfo(props) {
  const dispatch = useDispatch();
  const { updateCartThunk, error, setError, isLoading } = useUpdateCart();
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const localFavItems = useSelector((state) => state.localFavorite);
  const loginUser = useSelector((state) => state.loginUser);
  const favItems = loginUser ? loginUser?.favItem || [] : localFavItems;

  if (error) console.error(error);

  const { product } = props;

  const updateFavHandler = function () {
    dispatch(updateFav(product));
  };

  const updateCartHandler = async function (addedDetail) {
    dispatch(updateCartThunk(product, addedDetail));
  };

  const optionArr = Array.from({ length: 10 }, (cur, i) => i + 1);
  const options = optionArr.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));

  const specSelectHandler = function (e) {
    const spec = e.target.value;
    setError(null);
    setSelectedSpec(spec);
  };

  const quantityHandler = function (e) {
    const quantity = +e.target.value;
    setQuantity(quantity);
  };

  return (
    <div className={styles.product_info__container}>
      {isLoading && <Modal overlap={<div>loading</div>} />}
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
              <InputRadio
                labelTitle="規格:"
                name="spec"
                options={product.spec}
                selected={selectedSpec}
                onClick={specSelectHandler}
              />
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
          onClick={updateCartHandler.bind(null, {
            productNo: props.product.productNo,
            spec: selectedSpec,
            quantity: quantity,
            isAddFromCart: false,
          })}
        />
      </Form>
    </div>
  );
}

export default ProductInfo;
