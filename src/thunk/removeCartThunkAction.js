import { getMembers, updateMember } from "../helper/helper";

function removeCartItemThunk(removeItem) {
  return async function removeCartItemThunkAction(dispatch, getState) {
    const state = getState();
    const { loginUser } = getState();

    const getLatestUserInfo = async function () {
      const members = await getMembers();
      const loginUserLatest = members.find(
        (member) => member.account === loginUser.account
      );
      return loginUserLatest;
    };

    const updatedCartItems = async function () {
      const loginUserLatest = loginUser && (await getLatestUserInfo());

      let cartItemsLatest = loginUser
        ? loginUserLatest?.cartItem || []
        : [...state.localCart];

      const isExisted = cartItemsLatest.some(
        (item) => item.productDetailNo === removeItem.productDetailNo
      );

      if (!isExisted) {
        return;
      }
      if (isExisted) {
        cartItemsLatest = cartItemsLatest.filter(
          (item) => item.productDetailNo !== removeItem.productDetailNo
        );
      }

      return { cartItemsLatest, loginUserLatest };
    };

    const { cartItemsLatest, loginUserLatest } = await updatedCartItems();

    if (loginUser) {
      // update DB
      updateMember({ ...loginUserLatest, cartItem: cartItemsLatest });
      // update state
      dispatch({
        type: "REMOVE_CART_ITEM",
        payload: {
          ...state,
          loginUser: { ...loginUserLatest, cartItem: cartItemsLatest },
        },
      });
    }
    if (!loginUser) {
      // update local
      localStorage.setItem("localCart", JSON.stringify(cartItemsLatest));
      // update state
      dispatch({
        type: "REMOVE_CART_ITEM",
        payload: {
          ...state,
          localCart: cartItemsLatest,
        },
      });
    }
  };
}

export default removeCartItemThunk;
