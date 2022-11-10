import styles from "./OrderDetail.module.css";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";

function OrderDetail(props) {
  const { localCart, loginUser } = useSelector((state) => state);
  const { order } = props;
  const cartItems = order
    ? order.product // confirm if order data from Order.
    : loginUser // if not get cartItem from login user
    ? loginUser?.cartItem || []
    : localCart;

  const orderItems = cartItems.map((item) => (
    <OrderItem product={item} key={item.productDetailNo} />
  ));

  return (
    <div className={styles.order_detail__container}>
      <p className={styles.order_detail__title}>訂購明細</p>
      <div className={styles.order_detail__list}>{orderItems}</div>
    </div>
  );
}
export default OrderDetail;
