import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./MainNavigator.module.css";
import NavButton from "../UI/NavButton";
import Category from "../products/Category";

function MainNavigator() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const favItems = useSelector((state) => state.localFavorite);

  const openCategoryHandler = function () {
    setIsCategoryOpen(true);
  };

  const closeCategoryHandler = function () {
    setIsCategoryOpen(false);
  };
  return (
    <>
      <header className={`${styles.header} ${isCategoryOpen && "cate-open"}`}>
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
                {favItems.length ? (
                  <div className={styles.fav_quantity}>
                    <span>{favItems.length}</span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </li>
            <li>
              <NavButton>
                <ion-icon name="cart-outline"></ion-icon>
              </NavButton>
            </li>
            <li>
              <NavButton>
                <ion-icon name="person-outline"></ion-icon>
              </NavButton>
            </li>
          </ul>
        </nav>
      </header>
      <Category onMouseLeave={closeCategoryHandler} />
    </>
  );
}

export default MainNavigator;
