import styles from "./LoadingSpinner.module.css";

function LoadingSpinner(props) {
  return (
    <div
      className={styles.spinner__container}
      style={props.transparent && { backgroundColor: "transparent" }}
    >
      <div className={styles.spinner}></div>
    </div>
  );
}
export default LoadingSpinner;
