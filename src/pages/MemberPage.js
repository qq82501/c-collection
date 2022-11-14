import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MemberPage.module.css";

function MemberPage() {
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state);

  const logoutHandler = function () {
    dispatch({ type: "LOGOUT" });
  };

  const listContent = loginUser ? (
    <>
      <li>{`歡迎,  ${loginUser.account}`}</li>
      <li>
        <Link className="link">
          <button className={styles.btn__logout} onClick={logoutHandler}>
            登出
          </button>
        </Link>
      </li>
      <li>
        <Link to={`/memberProfile/${loginUser.account}`} className="link">
          會員資料
        </Link>
      </li>
      <li>
        <Link to={`/orderList/${loginUser.account}`} className="link">
          訂單資料
        </Link>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link to="/login" className="link">
          登入
        </Link>
      </li>
      <li>
        <Link to="/register" className="link">
          註冊
        </Link>
      </li>
    </>
  );

  return (
    <ul
      className={styles.member_feature__container}
      style={!loginUser && { gridTemplateColumns: "1fr 1fr" }}
    >
      {listContent}
      <li>
        <Link className="link">關於C.Collection</Link>
      </li>
    </ul>
  );
}

export default MemberPage;
