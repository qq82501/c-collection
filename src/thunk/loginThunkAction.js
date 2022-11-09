import { getMembers, updateMember } from "../helper/helper";

export function login(formData) {
  return async function loginThunk(dispatch, getState) {
    const validation = async function () {
      const members = await getMembers();

      const loginData = {
        account: formData.get("account"),
        password: formData.get("password"),
      };

      const loggedUser = members.find(
        (member) =>
          member.account === loginData.account &&
          member.password === loginData.password
      );

      const isValid = Boolean(loggedUser);

      return { isValid, loggedUser, members };
    };

    const updateFavCart = function (loggedUser) {
      const state = getState();
      const existedFavItems = loggedUser?.favItem || [];
      const existedCartItems = loggedUser?.cartItem || [];

      let newFavItems = [];
      let newCartItems = [];

      if (existedFavItems.length) {
        newFavItems = [...existedFavItems];
        state.localFavorite.forEach((localFav) => {
          const existedFavItemsIndex = existedFavItems.findIndex(
            (userFavItem) => userFavItem.productNo === localFav.productNo
          );
          if (existedFavItemsIndex < 0) {
            newFavItems.push(localFav);
          }
        });
      }

      if (!existedFavItems.length) {
        newFavItems = [...state.localFavorite];
      }

      if (existedCartItems.length) {
        newCartItems = [...existedCartItems];
        state.localCart.forEach((cartItem) => {
          const existedCartItemIndex = existedCartItems.findIndex(
            (item) => item.productDetailNo === cartItem.productDetailNo
          );
          if (existedCartItemIndex > -1) {
            newCartItems[existedCartItemIndex].quantity += cartItem.quantity;
          }
          if (existedCartItemIndex < 0) {
            newCartItems.push(cartItem);
          }
        });
      }

      if (!existedCartItems.length) {
        newCartItems = [...state.localCart];
      }

      return { newCartItems, newFavItems };
    };

    // start execute from here!
    try {
      const { isValid, loggedUser } = await validation();
      const { newCartItems, newFavItems } = updateFavCart(loggedUser);

      const user = {
        ...loggedUser,
        cartItem: newCartItems,
        favItem: newFavItems,
      };

      await updateMember(user);

      if (isValid) {
        // update local
        localStorage.setItem("loginUser", JSON.stringify(user));
        localStorage.removeItem("localFav");
        localStorage.removeItem("localCart");

        dispatch({ type: "LOGIN", payload: user });
        return isValid;
      }
      if (!isValid) {
        throw new Error("incorrect account or password");
      }
    } catch (e) {
      console.error(e.message);
    }
  };
}
