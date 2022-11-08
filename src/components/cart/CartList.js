import styles from "./CartList.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function CartList() {
  const loginUser = useSelector((state) => state.loginUser);
  const localCartItems = useSelector((state) => state.localCart);
  const cartItems = loginUser ? loginUser?.cartItem || [] : localCartItems;

  const cartItemsContent = cartItems.map((item) => (
    <CartItem key={item.productDetailNo} product={item} />
  ));

  return (
    <div className={styles.cart_list__container}>
      <h1 className={styles.cart_list__title}>我的購物車</h1>
      {!cartItems.length && <p className={styles.cart_list__empty_message}>購物車內尚無商品，繼續逛逛吧!</p>}
      {cartItemsContent}
    </div>
  );
}

export default CartList;
