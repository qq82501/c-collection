import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputWithPlaceHolder from "../UI/InputWithPlaceholder";
import styles from "./LoginModal.module.css";
import { login } from "../../thunk/loginThunkAction";

function LoginModal(props) {
  const delivery = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginAuthHandler = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isValid = await dispatch(login(formData));
    if (isValid) {
      navigate("/checkout", { state: { delivery } });
    }
  };

  return (
    <div className={styles.login_modal__container}>
      <p className={styles.login_modal__title}>請先登入以完成後續結帳</p>
      <form className={styles.login_modal__form} onSubmit={loginAuthHandler}>
        <InputWithPlaceHolder placeholder="帳號" id="account" type="text" />
        <InputWithPlaceHolder
          placeholder="密碼"
          id="password"
          type="password"
        />
        <button type="submit" className={"btn__login"}>
          登入
        </button>
      </form>
      <p className={styles.go_to_register}>
        <span>尚未加入會員?</span>
        <span>
          <Link className={`link ${styles.link__register}`}>註冊</Link>
        </span>
      </p>
      <button
        onClick={props.onClick}
        className={`btn__close ${styles.login_modal__btn_close}`}
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  );
}

export default LoginModal;
