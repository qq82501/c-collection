import styles from "./Input.module.css";

function Input(props) {
  let input;

  if (!props.selection) {
    input = (
      <input
        type={props.type}
        readOnly={props.readOnly}
        value={props.value}
        size={
          props.value.length > 9 ? props.value.length * 1.5 : props.value.length
        }
      />
    );
  }

  if (props.selection) {
    const options = props.selection.map((item) => (
      <option key={item} value={item}>
        {item}
      </option>
    ));
    input = (
      <select onChange={props.onChange} defaultValue={props.value}>
        {options}
      </select>
    );
  }

  return (
    <div className={styles.input__container}>
      <label>{props.labelTitle}</label>
      {input}
      {props.postfix && <span className={styles.postfix}>TWD</span>}
    </div>
  );
}
export default Input;
