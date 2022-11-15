import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./LoginPage.module.css";
import InputWithPlaceholder from "../components/UI/InputWithPlaceholder";
import OutlineContainer from "../components/UI/OutlineContainer";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { login } from "../thunk/loginThunkAction";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginHandler = async function (e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    try {
      const isValid = await dispatch(login(formData));
      if (isValid) navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.login_page__container}>
      {isLoading && <LoadingSpinner />}
      <OutlineContainer title="登入">
        <form className={styles.login_page__login_form} onSubmit={loginHandler}>
          {error && <p className="error_message">{error}</p>}
          <InputWithPlaceholder placeholder="帳號" id="account" />
          <InputWithPlaceholder
            placeholder="密碼"
            id="password"
            type="password"
          />
          <button type="submit" className="btn__login">
            登入
          </button>
          <p className={styles.login_page__register_box}>
            <span>尚未加入會員?</span>
            <span name="register">
              <Link to="/register" className={`link ${styles.link__register}`}>
                註冊
              </Link>
            </span>
          </p>
        </form>
      </OutlineContainer>
    </div>
  );
}

export default LoginPage;
