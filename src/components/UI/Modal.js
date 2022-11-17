import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <Backdrop onClick={props.onClick}>
      <ModalOverlap>{props.overlap}</ModalOverlap>
    </Backdrop>
  );
}

function Backdrop(props) {
  return (
    <div className="model__backdrop" onClick={props.onClick}>
      {props.children}
    </div>
  );
}

function ModalOverlap(props) {
  return <div className={styles.overlap__container}>{props.children}</div>;
}

export default Modal;
