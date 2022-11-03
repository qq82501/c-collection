import { useLocation } from "react-router-dom";
import styles from "./CheckoutPage.module.css";
import Contact from "../components/checkout/Contack";
import DeliveryDetail from "../components/checkout/DeliveryDetail";

function CheckoutPage() {
  return (
    <div className="nav-bar__height">
      <Contact />
      <DeliveryDetail />
    </div>
  );
}

export default CheckoutPage;
