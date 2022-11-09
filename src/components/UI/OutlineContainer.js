import styles from "./OutlineContainer.module.css";

function OutlineContainer(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{props.title}</h1>
      {props.children}
    </div>
  );
}
export default OutlineContainer;
