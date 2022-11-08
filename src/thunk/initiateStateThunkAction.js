import { getMembers, getAllProducts } from "../helper/helper";

function initialStateThunk() {
  return async function initialStateThunkAction(dispatch, getState) {
    const state = getState();
    const localLoginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (localLoginUser) {
      const members = await getMembers();
      const loginUserLatest = members.find(
        (member) => member.account === localLoginUser.account
      );
      dispatch({
        type: "SYNC_STATE_DATA",
        payload: { ...state, loginUser: loginUserLatest },
      });
    }
    if (!localLoginUser) {
      const localFavItems = JSON.parse(localStorage.getItem("localFav")) || [];
      const localCartItems =
        JSON.parse(localStorage.getItem("localCart")) || [];
      const products = await getAllProducts();
      const loginUser = JSON.parse(localStorage.getItem("loginUser"));
      dispatch({
        type: "SYNC_STATE_DATA",
        payload: {
          ...state,
          localFavorite: localFavItems,
          localCart: localCartItems,
          products: products,
          loginUser,
        },
      });
    }
  };
}

export default initialStateThunk;
