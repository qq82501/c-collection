import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./MyWishListPage.module.css";
import FavItem from "../components/wishlist/FavItem";

function MyWishListPage() {
  const favItems = useSelector((state) => state.localFavorite);
  const [clickedProduct, setClickedProduct] = useState("");

  const openSpecListHandler = function (productNo) {
    setClickedProduct(productNo);
  };

  const favContents = favItems.map((item) => {
    return (
      <FavItem
        className={clickedProduct === item.productNo && "open-spec"}
        key={item.productNo}
        product={item}
        onClick={openSpecListHandler}
      />
    );
  });

  return (
    <div className="nav-bar__height">
      <div className={styles.wish_list__title_bar}>您喜愛的商品</div>
      <div
        className={`breadcrumb__height  ${styles.wish_list__items_container}`}
      >
        {favContents}
      </div>
    </div>
  );
}

export default MyWishListPage;
