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
    setClickedProduct(productNo);
  };

  const favContents = favItems.map((item) => {
    return (
      <FavItem
        className={clickedProduct.productNo === item.productNo && "open-spec"}
        key={item.productNo}
        product={item}
        onClick={openSpecListHandler}
      />
    );
  });

  return (
    <div>
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
