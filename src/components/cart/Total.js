import { useSelector } from "react-redux";
import styles from "./Total.module.css";

function Total(props) {
  const { localCart, loginUser } = useSelector((state) => state);
  const { order } = props;
  const cartItems = order
    ? order.product
    : loginUser
    ? loginUser?.cartItem || []
    : localCart;

  const productSum = cartItems.reduce((acc, item) => {
    return (acc += item.price * item.quantity);
  }, 0);

  return (
    <div className={styles.total__container}>
      <div className={styles.flex_between} name="product_sum">
        <p>商品總額</p>
        <p>{`${new Intl.NumberFormat("zh-TW", {}).format(productSum)} TWD`}</p>
      </div>
      <div className={styles.flex_between} name="delivery_fee">
        <p>運費</p>
        <p>{`${new Intl.NumberFormat("zh-TW", {}).format(
          order ? order.delivery.deliveryFee : props.deliveryFee
        )} TWD`}</p>
      </div>
      <div className={styles.flex_between} name="total">
        <p>訂單總金額</p>
        <p>{`${new Intl.NumberFormat("zh-TW", {}).format(
          order ? order.totalPrice : productSum + props.deliveryFee
        )} TWD`}</p>
      </div>
    </div>
  );
}
export default Total;
