import styles from "./CheckoutPage.module.css";
import Contact from "../components/checkout/Contack";
import DeliveryDetail from "../components/checkout/DeliveryDetail";
import OrderDetail from "../components/checkout/OrderDetail";

function CheckoutPage() {
  return (
    <div className={`nav-bar__height ${styles.checkout_page__container}`}>
      <Contact />
      <OrderDetail />
      <DeliveryDetail />
    </div>
  );
}

export default CheckoutPage;
