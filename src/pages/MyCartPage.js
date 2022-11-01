import { useState } from "react";
import CartList from "../components/cart/CartList";
import Delivery from "../components/cart/Delivery";
import Total from "../components/cart/Total";
import styles from "./MyCartPage.module.css";

function MyCartPage() {
  const [delivery, setDelivery] = useState(null);

  const setDeliveryHandler = function (delivery) {
    setDelivery(delivery);
  };

  return (
    <div className={`nav-bar__height ${styles.my_cart_page__container}`}>
      <div className={styles.cartlist_box}>
        <CartList />
      </div>
      <div>
        <Delivery
          onDeliveryHandler={setDeliveryHandler}
          selectedDelivery={delivery}
        />
      </div>
      <div>
        <Total deliveryFee={delivery ? delivery.cost : 0} />
      </div>
      <button className={styles.btn__checkout}>結帳 →</button>
    </div>
  );
}

export default MyCartPage;
