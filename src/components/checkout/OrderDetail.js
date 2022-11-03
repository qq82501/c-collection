import styles from "./OrderDetail.module.css";
import OrderItem from "./OrderItem";
import { useSelector } from "react-redux";

function OrderDetail() {
  const cartItems = useSelector((state) => state.localCart);

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
