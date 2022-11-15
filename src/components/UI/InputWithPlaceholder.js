import React from "react";
import styles from "./InputWithPlaceholder.module.css";

const InputWithPlaceholder = React.forwardRef((props, ref) => {
  return (
    <div className={styles.input_box}>
      <input
        minlength={props.minlength}
        ref={ref}
        className={styles.input}
        id={props.id}
        name={props.id}
        type={props.type}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        required
      />
      <label htmlFor={props.id} className={styles.placeholder}>
        {props.placeholder}
      </label>
    </div>
  );
});

export default InputWithPlaceholder;
