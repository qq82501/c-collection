import { useSelector, useDispatch } from "react-redux";

function useFavorite(addedItem) {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.localFavorite);
  const allProducts = useSelector((state) => state.products);

  const updateFav = function () {
    const favItem = allProducts.find(
      (product) => product.productNo === addedItem.productNo
    );
    if (favItems.some((item) => item.productNo === addedItem.productNo))
      return dispatch({ type: "REMOVE_FAV", payload: favItem });
    dispatch({ type: "ADD_FAV", payload: favItem });
  };

  return updateFav;
}

export default useFavorite;
