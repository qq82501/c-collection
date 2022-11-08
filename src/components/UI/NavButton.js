import styles from "./NavButton.module.css";

function NavButton(props) {
  return (
    <button className={styles.navBtn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default NavButton;
