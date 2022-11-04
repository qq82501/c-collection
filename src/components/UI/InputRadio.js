import styles from "./InputRadio.module.css";

function InputRadio(props) {
  const radios = props.options.map((option) => (
    <label
      key={option}
      className={`${styles.radio__label}  ${
        props.selected === option && styles.selected
      } `}
    >
      <span>{option}</span>
      <input
        className={styles.radio}
        type="radio"
        name={props.name}
        value={option}
        onClick={props.onClick}
      />
    </label>
  ));

  return (
    <div className={styles.input__container}>
      <label>{`${props.labelTitle}`}</label>
      <div className={styles.radios_box}>{radios}</div>
      {props.postfix && <span>{props.postfix}</span>}
    </div>
  );
}
export default InputRadio;
