import styles from "./SpecSelector.module.css";
import BtnAddCart from "../UI/BtnAddCart";

function SpecSelector(props) {
  const specs = props.product.spec || [];

  const options = specs.map((spec) => (
    <label
      className={styles.spec_selector__label}
      key={spec}
      onClick={props.onAddToCart}
    >
      {spec}
      <input
        className={styles.spec_selector__radio}
        type="radio"
        name={`spec-${props.product.productNo}`}
      />
    </label>
  ));

  return (
    <div className={styles.spec_selector__container}>
      <BtnAddCart
        className={styles.spec_selector__btn_add_cart}
        onClick={props.onClick.bind(null, props.product.productNo)}
      />
      <div className={styles.spec_selector__label_box}>{options}</div>
    </div>
  );
}
export default SpecSelector;
