import { useLoaderData } from "react-router-dom";
import OutlineContainer from "../UI/OutlineContainer";
import Input from "../UI/Input";
import styles from "./OrderInfo.module.css";

function OrderInfo() {
  const order = useLoaderData();
  console.log(order);
  return (
    <OutlineContainer title="寄送與付款">
      <div className={styles.order_info__box}>
        <Input
          labelTitle="訂購人 :"
          value={`${order.orderUser.lastName} ${order.orderUser.firstName}`}
          readOnly={true}
        />
        <Input
          labelTitle="付款方式 :"
          value={order.payment.payBy}
          readOnly={true}
        />
        <Input
          labelTitle="付款狀態 :"
          value={order.payment.paymentStatus}
          readOnly={true}
        />
        {order.payment.payBy === "銀行轉帳" && (
          <Input
            labelTitle="收款帳號 :"
            value={order.payment.transferAcc}
            readOnly={true}
          />
        )}
        {order.payment.payBy === "信用卡扣款" && (
          <Input
            labelTitle="信用卡號 :"
            value={order.payment.credit.creditNo}
            readOnly={true}
          />
        )}
        <Input
          labelTitle="寄送方式 :"
          value={order.delivery.deliveryBy}
          readOnly={true}
        />
        {order.delivery.deliveryBy === "7-11店到店" && (
          <Input
            labelTitle="取件門市 :"
            value={order.delivery.store.storeName}
            readOnly={true}
          />
        )}
        {order.delivery.deliveryBy === "宅配" && (
          <Input
            labelTitle="收件地址 :"
            value={order.delivery.address}
            readOnly={true}
          />
        )}
        <Input
          labelTitle="收件人 :"
          value={order.delivery.recipient}
          readOnly={true}
        />
      </div>
    </OutlineContainer>
  );
}
export default OrderInfo;
