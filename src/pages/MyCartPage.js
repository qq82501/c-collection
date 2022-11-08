import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

import CartList from "../components/cart/CartList";
import Delivery from "../components/cart/Delivery";
import Total from "../components/cart/Total";
import Modal from "../components/UI/Modal";
import styles from "./MyCartPage.module.css";
import LoginModal from "../components/login/LoginModal";

function MyCartPage() {
  const navigate = useNavigate();
  const { localCart, loginUser, selectedDelivery } = useSelector(
    (state) => state
  );
  const delivery = useLoaderData();
  const cartItems = loginUser ? loginUser?.cartItem || [] : localCart;

  const [isCheckOutClicked, setIsCheckOutClicked] = useState(false);
  const [error, setError] = useState(null);
  console.log(1111, Boolean(cartItems.length));

  const checkOutHandler = function () {
    if (!selectedDelivery) {
      setError("*寄送方式未選");
      return;
    }

    if (loginUser) {
      navigate("/checkout", { state: { delivery } });
    }

    setIsCheckOutClicked(true);
  };

  const closeModalHandler = function (e) {
    if (
      !e.target.classList.contains("model__backdrop") &&
      !e.target.closest(".btn__close")
    )
      return;
    setIsCheckOutClicked(false);
  };

  const clearErrorHandler = function () {
    setError(null);
  };
  return (
    <>
      <div className={`nav-bar__height ${styles.my_cart_page__container}`}>
        <div className={styles.cartlist_box}>
          <CartList />
        </div>
        <div>
          <Delivery
            selectedDelivery={selectedDelivery}
            error={error}
            onClearError={clearErrorHandler}
            delivery={delivery}
          />
        </div>
        <div>
          <Total deliveryFee={selectedDelivery ? selectedDelivery.cost : 0} />
        </div>
        <button
          disabled={!Boolean(cartItems.length)}
          className={styles.btn__checkout}
          onClick={checkOutHandler}
        >
          結帳 →
        </button>
      </div>
      {isCheckOutClicked && (
        <Modal
          overlap={<LoginModal onClick={closeModalHandler} />}
          onClick={closeModalHandler}
        />
      )}
    </>
  );
}

export default MyCartPage;
