import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./MainNavigator.module.css";
import NavButton from "../UI/NavButton";
import Category from "../products/Category";
import NavLogin from "../login/NavLogin";

function MainNavigator() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isNavLoginOpen, setIsNavLoginOpen] = useState(false);
  const localFavItems = useSelector((state) => state.localFavorite);
  const localCartItems = useSelector((state) => state.localCart);
  const loginUser = useSelector((state) => state.loginUser);

  const favItems = loginUser ? loginUser?.favItem || [] : localFavItems;
  const cartItems = loginUser ? loginUser?.cartItem || [] : localCartItems;

  const cartQuantity = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  const openCategoryHandler = function () {
    setIsCategoryOpen(true);
  };

  const closeCategoryHandler = function () {
    setIsCategoryOpen(false);
  };

  const openNavLoginHandler = function () {
    setIsNavLoginOpen(true);
  };

  const closeNavLoginHandler = function () {
    setIsNavLoginOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!isNavLoginOpen) return;
      if (e.target.closest(".nav_icon__login")) return;
      if (!e.target.closest(".nav_login") && isNavLoginOpen)
        closeNavLoginHandler();
    });
  }, [isNavLoginOpen]);

  const loginButton = loginUser ? (
    <NavButton onClick={openNavLoginHandler}>
      <ion-icon name="person"></ion-icon>
    </NavButton>
  ) : (
    <NavButton onClick={openNavLoginHandler}>
      <ion-icon name="person-outline"></ion-icon>
    </NavButton>
  );

  return (
    <>
      <header
        className={`${styles.header} ${isCategoryOpen && "cate-open"} ${
          isNavLoginOpen && "nav_login__open"
        }`}
      >
        <Link to="/" className={`${styles.header_logo} link`}>
          C.Collection
        </Link>
        <nav className={styles["main-nav"]}>
          <ul className={`${styles["nav-links"]}`}>
            <li>
              <p onMouseEnter={openCategoryHandler}>商品</p>
            </li>
            <li>關於我們</li>
          </ul>

          <ul className={styles["nav-icons"]}>
            <li>
              <NavButton>
                <ion-icon name="search-outline"></ion-icon>
              </NavButton>
            </li>
            <li className={styles.nav_icon__fav}>
              <Link to="/myWishList">
                <NavButton>
                  <ion-icon name="heart-outline"></ion-icon>
                </NavButton>
                {console.log(favItems)}
                {favItems.length ? (
                  <div className={styles.icon_quantity}>
                    <span>{favItems.length}</span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li className={styles.nav_icon__cart}>
              <Link to="/myCart">
                <NavButton>
                  <ion-icon name="cart-outline"></ion-icon>
                </NavButton>
              </Link>
              {cartItems.length ? (
                <div className={styles.icon_quantity}>
                  <span>{cartQuantity}</span>
                </div>
              ) : (
                ""
              )}
            </li>
            <li className="nav_icon__login">{loginButton}</li>
          </ul>
        </nav>
      </header>
      <Category onMouseLeave={closeCategoryHandler} />
      <div className={`${styles.main_nav__nav_login_box} nav_login `}>
        <NavLogin onCloseNavLogin={closeNavLoginHandler} />
      </div>
    </>
  );
}

export default MainNavigator;
