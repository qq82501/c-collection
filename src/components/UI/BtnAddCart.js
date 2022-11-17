import styles from "./BtnAddCart.module.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function BtnAddCart(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.btn__add_cart} ${props.className} flex-center `}
    >
      <span>
        <ShoppingCartIcon />
      </span>
      加入購物車
    </button>
  );
}
export default BtnAddCart;
