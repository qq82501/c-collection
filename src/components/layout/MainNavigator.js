import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import {
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import NavButton from "../UI/NavButton";
import Category from "../products/Category";
import NavLogin from "../login/NavLogin";
import SearchBar from "../search/SearchBar";
import styles from "./MainNavigator.module.css";

function MainNavigator() {
  const refSearch = useRef();
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isNavLoginOpen, setIsNavLoginOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [navLoginError, setNavLoginError] = useState(null);
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

  const openSearchBarHandler = function () {
    setIsSearchBarOpen(true);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      const query = refSearch.current?.value.trim();
      if (!query || !query.length) return;
      if (e.key === "Enter") {
        navigate(`/searchResult?name=${query}`);
        refSearch.current.value = "";
      }
    });
    document.body.addEventListener("click", (e) => {
      if (!isNavLoginOpen && !isSearchBarOpen) return;

      if (
        e.target.closest(".nav_icon__login") ||
        e.target.closest(".nav_icon__search")
      )
        return;

      if (!e.target.closest(".nav_login") && isNavLoginOpen) {
        setNavLoginError(null);
        closeNavLoginHandler();
      }
      if (isSearchBarOpen) {
        setIsSearchBarOpen(false);
      }
    });
  }, [isNavLoginOpen, isSearchBarOpen, refSearch, navigate]);

  const loginButton = loginUser ? (
    <NavButton onClick={openNavLoginHandler}>
      <UserIconSolid />
    </NavButton>
  ) : (
    <NavButton onClick={openNavLoginHandler}>
      <UserIcon />
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
            <li className="nav_icon__search">
              <NavButton onClick={openSearchBarHandler}>
                <MagnifyingGlassIcon />
              </NavButton>
              <SearchBar
                isSearchBarOpen={isSearchBarOpen}
                placeholder="尋找商品..."
                ref={refSearch}
              />
            </li>
            <li className={styles.nav_icon__fav}>
              <Link to="/myWishList">
                <NavButton>
                  <HeartIcon />
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
                  <ShoppingCartIcon />
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
        <NavLogin
          onCloseNavLogin={closeNavLoginHandler}
          navLoginError={navLoginError}
          onSetNavLoginError={setNavLoginError}
        />
      </div>
    </>
  );
}

export default MainNavigator;
