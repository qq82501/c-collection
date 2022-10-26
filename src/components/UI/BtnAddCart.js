import styles from "./BtnAddCart.module.css";

function BtnAddCart(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.btn__add_cart} ${props.className} flex-center `}
    >
      <span>
        <ion-icon name="cart-outline"></ion-icon>
      </span>
      加入購物車
    </button>
  );
}
export default BtnAddCart;
