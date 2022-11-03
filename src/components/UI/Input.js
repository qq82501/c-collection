import styles from "./Input.module.css";

function Input(props) {
  let input;

  if (!props.selection) {
    input = (
      <input
        style={
          props.labelTitle.includes("額")
            ? { textAlign: "end", paddingRight: "5px" }
            : {}
        }
        type={props.type}
        readOnly={props.readOnly}
        value={props.value}
        size={
          props.labelTitle.includes("額")
            ? 2
            : props.value.length > 6
            ? props.value.length * 1.5
            : props.value.length
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
      <select
        onChange={props.onChange}
        defaultValue={props.value}
        required={props.required}
      >
        <option selected disabled>
          請選擇
        </option>
        {options}
      </select>
    );
  }

  return (
    <div className={styles.input__container}>
      <label>{`${props.labelTitle}`}</label>
      {input}
      {props.postfix && <span>TWD</span>}
    </div>
  );
}
export default Input;
