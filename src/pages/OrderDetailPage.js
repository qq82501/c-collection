import { Link, useLoaderData, useParams } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import OrderDetail from "../components/checkout/OrderDetail";
import OrderInfo from "../components/member/OrderInfo";
import Total from "../components/cart/Total";
import styles from "./OrderDetailPage.module.css";

function OrderDetailPage() {
  const order = useLoaderData();
  const param = useParams();

  return (
    <div
      className={`nav-bar__height__outline_container ${styles.order_detail_page__container}`}
    >
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
