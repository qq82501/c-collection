import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Delivery.module.css";
import { TruckIcon } from "@heroicons/react/24/outline";
import OutlineContainer from "../UI/OutlineContainer";

function Delivery(props) {
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const delivery = useLoaderData();
  const dispatch = useDispatch();

  const setOptionHandler = function () {
    setIsOptionOpen(true);
  };

  const setDelivryMethodHandler = function (e) {
    const selectedMethodDetail = delivery.find(
      (method) => method.title === e.target.value
    );
    dispatch({ type: "SET_DELIVERY", payload: selectedMethodDetail });
    props.onClearError();
    setIsOptionOpen(false);
  };

  const selectedDelivery = !props.selectedDelivery ? (
    <div
      className={`${styles.delivery__selector} ${
        props.error && styles.delivery__selector_error
      }`}
    >
      請選擇寄送方式
    </div>
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
    <label key={method.title}>
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
    <>
      <OutlineContainer title="寄送方式">
        <div
          onClick={setOptionHandler}
          className={`${styles.delivery__selector_box} ${
            isOptionOpen && styles.delivery__options_shown
          } `}
        >
          {props.error && (
            <span className={styles.error_message}>{props.error}</span>
          )}
          <div className={styles.delivery__arrow}></div>
          {selectedDelivery}
        </div>

        <div className={`${styles.delivery__options}`}>{options}</div>
      </OutlineContainer>
      {/* <div
        className={`${styles.delivery__container} ${
          isOptionOpen && styles.delivery__options_shown
        }  `}
      >
        <div>
          <div className={styles.delivery__heading}>寄送方式</div>

          <div
            onClick={setOptionHandler}
            className={styles.delivery__selector_box}
          >
            {props.error && (
              <span className={styles.error_message}>{props.error}</span>
            )}
            <div className={styles.delivery__arrow}></div>
            {selectedDelivery}
          </div>

          <div className={`${styles.delivery__options}`}>{options}</div>
        </div>
      </div> */}
    </>
  );
}

export default Delivery;
