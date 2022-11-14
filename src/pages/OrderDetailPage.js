import { Link, useLoaderData, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import OrderDetail from "../components/checkout/OrderDetail";
import OrderInfo from "../components/member/OrderInfo";
import Total from "../components/cart/Total";
import styles from "./OrderDetailPage.module.css";

function OrderDetailPage() {
  const navigate = useNavigate();
  const order = useLoaderData();
  const param = useParams();
  const loginUser = useSelector((state) => state.loginUser);
  const isLogin = Boolean(loginUser);

  useEffect(() => {
    if (!isLogin) navigate("/");
  }, [isLogin, navigate]);

  return (
    <div className={styles.order_detail_page__container}>
      <div className={styles.order_list__title_bar}>
        <span>{`訂單編號: ${order.orderNo}`}</span>
        <Link
          to={`/orderList/${param.account}`}
          className={`link ${styles.order_list__return_link}`}
        >
          <ArrowLeftOnRectangleIcon />
          <span>返回</span>
        </Link>
      </div>
      <div className={styles.order_list__grid_box}>
        <div name="orderDetail">
          <OrderDetail order={order} />
        </div>
        <div name="orderInfo">
          <OrderInfo />
        </div>
        <div name="totalInfo">
          <Total order={order} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
