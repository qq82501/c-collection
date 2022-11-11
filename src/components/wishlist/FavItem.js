import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FavItem.module.css";
import SpecSelector from "./SpecSelector";
import updateFav from "../../thunk/updateFavThunkAction";
import useUpdateCart from "../../hook/useUpdaeCart";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";

function FavItem(props) {
  const { updateCartThunk, isLoading } = useUpdateCart();
  const dispatch = useDispatch();
  const [isImageChange, setIsImageChange] = useState(false);

  const { productNo } = props.product;
  const spec = props.product.spec || [];

  const imageChangeHandler = function () {
    setIsImageChange((prevState) => !prevState);
  };

  const updateFavHandler = function () {
    dispatch(updateFav(props.product));
  };

  const updateCartHandler = function (addedDetail) {
    dispatch(updateCartThunk(props.product, addedDetail));
  };

  return (
    <>
      <div className={`${styles.product_item__container} ${props.className}`}>
        {isLoading && <Modal overlap={<LoadingSpinner transparent={true} />} />}
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
            className={`btn__close ${styles.fav_item__close} `}
            onClick={updateFavHandler}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div className={styles.product_item__info}>
          <p>{props.product.title}</p>
          <p
            className={styles.product_item__info_price}
          >{`${props.product.price} TWD`}</p>
          <SpecSelector
            product={props.product}
            onClick={spec.length ? props.onClick : updateCartHandler}
            onAddToCart={updateCartHandler}
          />
        </div>
      </div>
    </>
  );
}
export default FavItem;
