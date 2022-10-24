import styles from "./NavButton.module.css";

function NavButton(props) {
  return <button className={styles.navBtn}>{props.children}</button>;
}

export default NavButton;
