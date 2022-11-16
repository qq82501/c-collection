import { useSelector, useDispatch } from "react-redux";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./DeliveryDetail.module.css";
import HomeDelivery from "./HomeDelivery";
import StoreDelivery from "./StoreDelivery";
import InputRadio from "../UI/InputRadio";
import CreditCard from "./CreditCard";
import CheckoutAuthContext from "../../context/checkout-auth-context";

function DeliveryDetail() {
  const context = useContext(CheckoutAuthContext);
  const { paymentError } = context;

  const dispatch = useDispatch();
  const location = useLocation();
  const selectedDelivery = useSelector((state) => state.selectedDelivery);
  const [payment, setPayment] = useState(null);

  const { delivery } = location.state;

  const setDeliveryHandler = function (e) {
    const selectedDelivery = delivery.find(
      (method) => method.title === e.target.textContent
    );
    dispatch({ type: "SET_DELIVERY", payload: selectedDelivery });
  };

  const setPaymentHandler = function (e) {
    setPayment(e.target.value);
  };

  const tabs = delivery.map((method) => (
    <button
      key={method.title}
      type="button"
      onClick={setDeliveryHandler}
      className={styles.tab}
      style={
        method.title !== selectedDelivery.title
          ? {
              backgroundColor: "#c3c3c3",
              boxShadow: "inset 0 -4px 8px -4px rgba(0, 0, 0, 0.15)",
            }
          : {}
      }
    >
      {method.title}
    </button>
  ));

  const tabDetail = selectedDelivery.title.includes("宅") ? (
    <HomeDelivery />
  ) : (
    <StoreDelivery />
  );

  const paymentContent =
    payment === "銀行轉帳"
      ? "訂單送出後會取得匯款帳號，請於三個工作日內匯款。本公司收到款項後會進行出貨安排。"
      : payment === "貨到付款"
      ? "至取貨門市領取包裹時付款"
      : "123";

  return (
    <div className={styles.delivery_detail__container}>
      <div className={styles.tabs__box}>{tabs}</div>
      <div className={styles.tab__detail_box}>
        <div>{tabDetail}</div>
        <div className={`${styles.payment_box} ${paymentError && "error_box"}`}>
          {paymentError && <p className="error_message">{paymentError}</p>}
          <div className={styles.payment_radio_box}>
            <InputRadio
              labelTitle="付款方式 :"
              options={selectedDelivery.payment}
              selected={payment}
              name="payment"
              onClick={setPaymentHandler}
            />
          </div>
          {payment && payment !== "信用卡扣款" && (
            <p className={styles.payment_message}>{paymentContent}</p>
          )}
          {payment === "信用卡扣款" && <CreditCard />}
        </div>
      </div>
    </div>
  );
}
export default DeliveryDetail;
