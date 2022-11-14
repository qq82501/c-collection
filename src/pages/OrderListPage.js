import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import OutlineContainer from "../components/UI/OutlineContainer";
import styles from "./OrderListPage.module.css";

function OrderListPage() {
  const navigate = useNavigate();
  const order = useLoaderData();
  const loginUser = useSelector((state) => state.loginUser);
  const isLogin = Boolean(loginUser);

  useEffect(() => {
    if (!isLogin) navigate("/");
  }, [isLogin, navigate]);

  const orderListContent = order.map((item) => (
    <li className={styles.order_list__row}>
      <Link
        to={`/orderList/${item.orderUser.email}/${item.orderNo}`}
        className={`link ${styles.order_list__order_no}`}
      >
        {item.orderNo}
      </Link>
      <p>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(item.orderDate))}
      </p>
      <p>{new Intl.NumberFormat("zh-TW").format(item.totalPrice)}</p>
    </li>
  ));

  return (
    <div className={styles.order_list__container}>
      <OutlineContainer title="訂單列表">
        <ul className={styles.order_list__table}>
          <li className={styles.order_list__head}>
            <h3>訂單編號</h3>
            <h3>訂單成立時間</h3>
            <h3>金額</h3>
          </li>
          {orderListContent}
        </ul>
      </OutlineContainer>
    </div>
  );
}
export default OrderListPage;
