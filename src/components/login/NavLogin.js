import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./NavLogin.module.css";
import ImputWithPlaceholder from "../UI/InputWithPlaceholder";
import { login } from "../../thunk/loginThunkAction";

function NavLogin(props) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.loginUser);

  const logoutHandler = function () {
    dispatch({ type: "LOGOUT" });
    props.onCloseNavLogin();
  };

  const loginHandler = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const isValid = await dispatch(login(formData));
    if (isValid) props.onCloseNavLogin();
  };

  const memberService = ["會員資料", "訂單資料"];
  const serviceItems = memberService.map((item) => (
    <li key={item}>
      <Link
        className="link"
        to={
          item === "會員資料"
            ? loginUser
              ? `/memberProfile/${loginUser.account}`
              : ""
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
    <form className={styles.nav_login__form} onSubmit={loginHandler}>
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

  return <div className={styles.nav_login__container}>{navLoginContent}</div>;
}
export default NavLogin;
