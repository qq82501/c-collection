import { useState } from "react";
import styles from "./Delivery.module.css";
import { TruckIcon } from "@heroicons/react/24/outline";

const delivery = [
  { title: "7-11店到店", cost: 60 },
  { title: "送貨到府", cost: 80 },
];

function Delivery(props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);

  const setOptionHandler = function () {
    setIsOptionOpen(true);
  };

  const setDelivryMethodHandler = function (e) {
    const selectedMethodDetail = delivery.find(
      (method) => method.title === e.target.value
    );
    props.onDeliveryHandler(selectedMethodDetail);
    setIsOptionOpen(false);
  };

  const selectedDelivery = !props.selectedDelivery ? (
    <div className={styles.delivery__selector}>請選擇寄送方式</div>
  ) : (
    <div className={styles.delivery__option_box}>
      <TruckIcon className={styles.delivery__icon} />
      <p className={styles.delivery__method}>{props.selectedDelivery.title}</p>
      <p
        className={styles.delivery__fee}
      >{`${props.selectedDelivery.cost} TWD`}</p>
    </div>
  );

  const options = delivery.map((method) => (
    <label>
      <div
        className={`${styles.delivery__option_box} ${
          props.selectedDelivery?.title === method.title &&
          styles.delivery__option_box_selected
        }`}
      >
        <TruckIcon className={styles.delivery__icon} />
        <p className={styles.delivery__method}>{method.title}</p>
        <p className={styles.delivery__fee}>{`${method.cost} TWD`}</p>
      </div>
      <input
        type="radio"
        name="delivery"
        className={styles.delivery__radio}
        onClick={setDelivryMethodHandler}
        value={method.title}
      ></input>
    </label>
  ));

  return (
    <div
      className={`${styles.delivery__container} ${
        isOptionOpen && styles.delivery__options_shown
      } `}
    >
      <div>
        <div className={styles.delivery__heading}>寄送方式</div>

        <div
          onClick={setOptionHandler}
          className={styles.delivery__selector_box}
        >
          <div className={styles.delivery__arrow}></div>
          {selectedDelivery}
        </div>

        <div className={`${styles.delivery__options}`}>{options}</div>
      </div>
    </div>
  );
}

export default Delivery;
