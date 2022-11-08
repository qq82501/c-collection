import { useSelector, useDispatch } from "react-redux";
import styles from "./CheckoutPage.module.css";
import Contact from "../components/checkout/Contack";
import DeliveryDetail from "../components/checkout/DeliveryDetail";
import OrderDetail from "../components/checkout/OrderDetail";
import Total from "../components/cart/Total";
import { submitOrder } from "../thunk/submitOrderThunkAction";

function CheckoutPage() {
  const dispatch = useDispatch();
  const selectedDelivery = useSelector((state) => state.selectedDelivery);
  const cartItems = useSelector((state) => state.localCart);
  const loginUser = useSelector((state) => state.loginUser);
  console.log(loginUser);

  const submitOrderHandler = async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = {
      orderUser: {
        lastName: loginUser.lastName,
        firstName: loginUser.firstName,
        contact: loginUser.contactNumber,
        email: loginUser.account,
      },
      orderNo: `${loginUser.account.slice(0, 2)}${Date.now()}`,
      orderDate: `${new Date()}`,
      delivery: {
        deliveryBy: selectedDelivery.title,
        deliveryFee: selectedDelivery.cost,
      },
      payment: {
        payBy: formData.get("payment"),
      },
      product: cartItems,
    };

    if (selectedDelivery.title === "7-11店到店") {
      order.delivery.recipient = `${formData.get(
        "recipientLast"
      )}  ${formData.get("recipientFirst")}`;
      order.delivery.store = {
        city: formData.get("city"),
        dist: formData.get("dist"),
        road: formData.get("road"),
        storeName: formData.get("storeName"),
      };
    }

    if (selectedDelivery.title === "宅配") {
      order.delivery.recipient = `${formData.get(
        "homeLastName"
      )}  ${formData.get("homeFirstName")}`;
      order.delivery.contact = formData.get("contactNumber");
      order.delivery.address = formData.get("address");
    }

    if (formData.get("payment") === "信用卡扣款") {
      order.payment.paymentStatus = "已完成";
      order.payment.credit = {
        creditNo: formData.get("cardNumber").replaceAll(" ", ""),
        expiryDate: formData.get("expire"),
        csv: formData.get("csv"),
      };
    }

    if (formData.get("payment") === "銀行轉帳") {
      order.payment.paymentStatus = "未完成";
      order.payment.transferAcc = Array.from({ length: 16 }, (cur) =>
        Math.floor(Math.random() * 10)
      ).join("");
    }

    dispatch(submitOrder(order));

    // const res = await fetch(
    //   "https://c-collection-default-rtdb.firebaseio.com/order.json"
    // );
    console.log(order);
  };

  return (
    <form
      className={`nav-bar__height ${styles.checkout_page__container}`}
      onSubmit={submitOrderHandler}
    >
      <Contact />
      <div name="order_detail">
        <OrderDetail />
        <Total deliveryFee={selectedDelivery.cost} />
        <button type="submit" className={styles.btn__send_order}>
          送出訂單
        </button>
      </div>
      <DeliveryDetail />
    </form>
  );
}

export default CheckoutPage;
