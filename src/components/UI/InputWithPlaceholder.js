import styles from "./InputWithPlaceholder.module.css";

function InputWithPlaceHolder(props) {
  return (
    <div className={styles.input_box}>
      <input
        className={styles.input}
        id={props.id}
        name={props.id}
        type={props.type}
        defaultValue={props.defaultValue}
        required
      />
      <label htmlFor={props.id} className={styles.placeholder}>
        {props.placeholder}
      </label>
    </div>
  );
}

export default InputWithPlaceHolder;
