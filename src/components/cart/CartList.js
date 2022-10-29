import styles from "./CartList.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function CartList() {
  const cartItems = useSelector((state) => state.localCart);

  const cartItemsContent = cartItems.map((item) => (
    <CartItem key={item.productNo} product={item} />
  ));

  return (
    <div className={styles.cart_list__container}>
      <h1 className={styles.cart_list__title}>我的購物車</h1>
      {cartItemsContent}
    </div>
  );
}

export default CartList;
