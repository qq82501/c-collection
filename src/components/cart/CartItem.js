import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CartItem.module.css";
import Input from "../UI/Input";
import updateFav from "../../thunk/updateFavThunkAction";
import useUpdateCart from "../../hook/useUpdaeCart";
import removeCartItemThunk from "../../thunk/removeCartThunkAction";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

function CartItem(props) {
  const { updateCartThunk, isLoading } = useUpdateCart();
  const localFavItems = useSelector((state) => state.localFavorite);
  const loginUser = useSelector((state) => state.loginUser);
  const favItems = loginUser ? loginUser.favItem || [] : localFavItems;
  const dispatch = useDispatch();

  const updateFavHandler = function () {
    dispatch(updateFav(props.product));
  };

  const updateCartHandler = function (addedDetail, e) {
    const updatedQuantity = +e.target.value;
    const newQuantity = updatedQuantity - addedDetail.quantity;
    addedDetail.quantity = newQuantity;
    dispatch(updateCartThunk(props.product, addedDetail));
  };

  const removeCartItem = function () {
    dispatch(removeCartItemThunk(props.product));
  };

  const quantitySelection = Array.from(
    { length: props.product.quantity + 9 },
    (cur, i) => i + 1
  );

  return (
    <div className={styles.cart_item__container}>
      {isLoading && <Modal overlap={<LoadingSpinner />} />}
      <Link
        to={`/productDetail/${props.product.productNo}`}
        className={styles.cart_item__img_box}
      >
        <img
          className={styles.cart_item__img}
          alt="product"
          src={require(`../../images/products/${props.product.productNo}/01.jpg`)}
        />
      </Link>
      <div className={styles.cart_item__info_box}>
        <div>
          <Input
            type="text"
            readOnly={true}
            labelTitle="品名 : "
            value={props.product.title}
          />
          {props.product.spec && (
            <Input
              type="text"
              readOnly={true}
              labelTitle="規格 : "
              value={props.product.selectedSpec}
            />
          )}

          <Input
            type="text"
            readOnly={true}
            labelTitle="數量 : "
            value={props.product.quantity}
            selection={quantitySelection}
            onChange={updateCartHandler.bind(null, {
              productNo: props.product.productDetailNo,
              spec: props.product.selectedSpec,
              quantity: props.product.quantity,
              isAddFromCart: true,
            })}
          />
        </div>
        <p className={styles.cart_item__productNo}>
          {props.product.productDetailNo}
        </p>
      </div>
      <div className={styles.cart_item__price_box}>
        <div className={styles.cart_item__btns_box}>
          <button
            onClick={updateFavHandler}
            className={`${styles.cart_item__fav_btn} favorite ${
              favItems.some(
                (item) => item.productNo === props.product.productNo
              ) && `fav__active`
            }`}
          >
            <HeartIcon />
          </button>
          <button
            onClick={removeCartItem}
            className={`btn__close ${styles.cart_item__close_btn}`}
          >
            <TrashIcon />
          </button>
        </div>
        <div className={styles.total_box}>
          <Input
            type="text"
            readOnly={true}
            labelTitle="金額 : "
            value={`${new Intl.NumberFormat("zh-TW", {}).format(
              props.product.price * props.product.quantity
            )}`}
            postfix="TWD"
          />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
