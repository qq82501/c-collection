import { useSelector, useDispatch } from "react-redux";
import styles from "./DeliveryDetail.module.css";
import { useLocation } from "react-router-dom";
import HomeDelivery from "./HomeDelivery";
import StoreDelivery from "./StoreDelivery";

function DeliveryDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedDelivery = useSelector((state) => state.selectedDelivery);

  const { delivery } = location.state;

  const setDeliveryHandler = function (e) {
    const selectedDelivery = delivery.find(
      (method) => method.title === e.target.textContent
    );
    dispatch({ type: "SET_DELIVERY", payload: selectedDelivery });
  };

  const tabs = delivery.map((method) => (
    <button
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

  return (
    <div className={styles.delivery_detail__container}>
      <div className={styles.tabs__box}>{tabs}</div>
      <div className={styles.tab__detail_box}>{tabDetail}</div>
    </div>
  );
}
export default DeliveryDetail;
