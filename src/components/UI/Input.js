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
        id={props.id}
        readOnly={props.readOnly}
        value={props.value}
        size={
          props.labelTitle.includes("額")
            ? 2
            : props.labelTitle.includes("信用卡號")
            ? 15
            : props.labelTitle.includes("商品編號")
            ? 12
            : props.labelTitle.includes("收款帳號")
            ? props.value.length - 2
            : props.labelTitle.includes("聯絡電話")
            ? 9
            : props.labelTitle.includes("信箱")
            ? 15
            : props.value.length > 4
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
        name={props.id}
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
      {props.postfix && <span>{props.postfix}</span>}
    </div>
  );
}
export default Input;
