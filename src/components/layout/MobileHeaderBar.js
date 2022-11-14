import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import styles from "./MobileHeaderBar.module.css";
import NavButton from "../UI/NavButton";

import SearchBar from "../search/SearchBar";

function MobileHeaderBar() {
  const refSearch = useRef();
  const navigate = useNavigate();
  const {
    localFavorite: localFavItems,
    localCart: localCartItems,
    loginUser,
  } = useSelector((state) => state);

  const favItems = loginUser ? loginUser?.favItem || [] : localFavItems;
  const cartItems = loginUser ? loginUser?.cartItem || [] : localCartItems;

  const cartQuantity = cartItems.reduce((acc, item) => {
    return (acc += item.quantity);
  }, 0);

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      const query = refSearch.current?.value.trim();
      if (!query || !query.length) return;
      if (e.key === "Enter") {
        navigate(`/searchResult?name=${query}`);
        refSearch.current.value = "";
      }
    });
  }, [refSearch, navigate]);

  return (
    <>
      <header className={`${styles.header} `}>
        <Link to="/" className={`${styles.header_logo} link`}>
          C.Collection
        </Link>
        <SearchBar placeholder="尋找商品..." ref={refSearch} />
        <nav className={styles["main-nav"]}>
          <ul className={styles["nav-icons"]}>
            <li className={styles.nav_icon__fav}>
              <Link to="/myWishList">
                <NavButton>
                  <ion-icon name="heart-outline"></ion-icon>
                </NavButton>
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
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MobileHeaderBar;
