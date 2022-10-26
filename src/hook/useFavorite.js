import { useSelector, useDispatch } from "react-redux";

function useFavorite(product) {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.localFavorite);
  const favArr = favItems.map((item) => item.productNo);

  const updateFav = function () {
    if (favArr.includes(product.productNo))
      return dispatch({ type: "REMOVE_FAV", payload: product });
    dispatch({ type: "ADD_FAV", payload: product });
  };

  return updateFav;
}

export default useFavorite;
