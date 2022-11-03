// import styles from "./Modal.module.css";

function Modal(props) {
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
  return <div>{props.children}</div>;
}

export default Modal;
