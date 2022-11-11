import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./NavLogin.module.css";
import ImputWithPlaceholder from "../UI/InputWithPlaceholder";
import { login } from "../../thunk/loginThunkAction";
import LoadingSpinner from "../UI/LoadingSpinner";

function NavLogin(props) {
  const refForm = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = useSelector((state) => state.loginUser);
  const { navLoginError } = props;

  useEffect(() => {
    if (!navLoginError) {
      if (!refForm.current) return;
      const inputEls = refForm.current.querySelectorAll("input");
      inputEls.forEach((input) => (input.value = ""));
    }
  }, [navLoginError]);

  const logoutHandler = function () {
    dispatch({ type: "LOGOUT" });
    props.onCloseNavLogin();
  };

  const loginHandler = async function (e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const isValid = await dispatch(login(formData));
      if (isValid) props.onCloseNavLogin();
    } catch (error) {
      props.onSetNavLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const memberService = ["會員資料", "訂單資料"];
  const serviceItems = memberService.map((item) => (
    <li key={item}>
      <Link
        className="link"
        onClick={props.onCloseNavLogin}
        to={
          loginUser
            ? item === "會員資料"
              ? `/memberProfile/${loginUser.account}`
              : `/orderList/${loginUser.account}`
            : ""
        }
      >
        {item}
      </Link>
    </li>
  ));

  const navLoginContent = loginUser ? (
    <div className={styles.nav_login__member_mg_list_box}>
      <h2>歡迎 {loginUser.account}</h2>
      <ul className={styles.nav_login__member_mg_list}>{serviceItems}</ul>
      <button className={styles.btn__logout} onClick={logoutHandler}>
        登出
      </button>
    </div>
  ) : (
    <form
      className={styles.nav_login__form}
      onSubmit={loginHandler}
      ref={refForm}
    >
      {navLoginError && <p className="error_message">{navLoginError}</p>}
      <ImputWithPlaceholder placeholder="帳號" id="account" />
      <ImputWithPlaceholder placeholder="密碼" id="password" type="password" />
      <button type="submit" className="btn__login">
        登入
      </button>
      <p className={styles.nav_login__register_box}>
        <span>尚未加入會員?</span>
        <span name="register">
          <Link to="/register" className={`link ${styles.link__register}`}>
            註冊
          </Link>
        </span>
      </p>
    </form>
  );

  return (
    <div className={styles.nav_login__container}>
      {isLoading && <LoadingSpinner />}
      {navLoginContent}
    </div>
  );
}
export default NavLogin;
