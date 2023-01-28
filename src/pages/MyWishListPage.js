import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MyWishListPage.module.css";
import FavItem from "../components/wishlist/FavItem";

function MyWishListPage() {
  const loginUser = useSelector((state) => state.loginUser);
  const localFavItems = useSelector((state) => state.localFavorite);
  const favItems = loginUser ? loginUser?.favItem || [] : localFavItems;
  const [clickedProduct, setClickedProduct] = useState("");

  const openSpecListHandler = function (productNo) {
    console.log(productNo);
    setClickedProduct(productNo);
  };

  const closeSpecListHandler = function (e) {
    if (e.target.id === "wish_list__items_container") {
      setClickedProduct("");
    }
  };

  let favContents;
  if (favItems.length) {
    favContents = favItems.map((item) => {
      return (
        <FavItem
          className={clickedProduct.productNo === item.productNo && "open-spec"}
          key={item.productNo}
          product={item}
          onClick={openSpecListHandler}
        />
      );
    });
  }
  if (!favItems.length) {
    favContents = (
      <p className="non_result__box">還未有商品加入呢，去逛逛有什麼喜歡的吧!</p>
    );
  }

  return (
    <div>
      <div className={styles.wish_list__title_bar}>您喜愛的商品</div>
      <div
        id="wish_list__items_container"
        className={`breadcrumb__height  ${styles.wish_list__items_container}`}
        onClick={closeSpecListHandler}
      >
        {favContents}
      </div>
    </div>
  );
}

export default MyWishListPage;
