import { useSelector, useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import Input from "../UI/Input";
import useAddCart from "../../hook/useAddCart";
import useFavorite from "../../hook/useFavorite";

function CartItem(props) {
  const favItems = useSelector((state) => state.localFavorite);
  const updateFav = useFavorite(props.product);
  const dispatch = useDispatch();
  const { addToCartHandler } = useAddCart(props.product);

  const removeCartItem = function () {
    dispatch({ type: "REMOVE_CART_ITEM", payload: props.product });
  };

  const quantitySelection = Array.from(
    { length: props.product.quantity + 9 },
    (cur, i) => i + 1
  );
  return (
    <div className={styles.cart_item__container}>
      <img
        className={styles.cart_item__img}
        alt="product"
        src={require(`../../images/products/${props.product.imgPath}`)}
      />
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
            onChange={addToCartHandler.bind(null, {
              productNo: props.product.productNo,
              spec: props.product.spec,
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
            onClick={updateFav}
            className={`${styles.cart_item__fav_btn} favorite ${
              favItems.some(
                (item) => item.productNo === props.product.productNo
              ) && `fav__active`
            }`}
          >
            <ion-icon name="heart"></ion-icon>
          </button>
          <button
            onClick={removeCartItem}
            className={`btn__close ${styles.cart_item__close_btn}`}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>

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
  );
}

export default CartItem;
