import { getMembers, updateMember } from "../helper/helper";
import { useState } from "react";
import { wait } from "../helper/helper";

function useUpdateCart() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function updateCartThunk(productItem, addedDetail) {
    return async function updateCartThunkAction(dispatch, getState) {
      const state = getState();
      const { loginUser } = getState();

      const getLatestUserInfo = async function () {
        const members = await getMembers();
        const loginUserLatest = members.find(
          (member) => member.account === loginUser.account
        );
        return loginUserLatest;
      };

      const formatProduct = function () {
        if (productItem.spec?.length > 0 && !addedDetail.spec) {
          throw new Error("請選擇規格");
        }

        const product = {
          productNo: productItem.productNo,
          productDetailNo: addedDetail.isAddFromCart
            ? `${productItem.productDetailNo}`
            : `${productItem.productNo}${
                addedDetail.spec ? `-${addedDetail.spec}` : ""
              }`,
          title: productItem.title,
          price: productItem.price,
          spec: productItem.spec,
          selectedSpec: addedDetail.spec,
          quantity: addedDetail.quantity,
        };

        return product;
      };

      const updatedCartItems = async function () {
        const loginUserLatest = loginUser && (await getLatestUserInfo());
        const addedItem = formatProduct();

        let cartItemsLatest = loginUser
          ? loginUserLatest?.cartItem || []
          : [...state.localCart];

        const existedCartItemIndex = cartItemsLatest.findIndex(
          (item) => item.productDetailNo === addedItem.productDetailNo
        );

        if (existedCartItemIndex < 0) {
          cartItemsLatest.push(addedItem);
        }
        if (existedCartItemIndex > -1) {
          const existedCartItem = Object.assign(
            {},
            cartItemsLatest[existedCartItemIndex]
          );
          existedCartItem.quantity += addedItem.quantity;
          cartItemsLatest[existedCartItemIndex] = existedCartItem;
        }

        return { cartItemsLatest, loginUserLatest };
      };

      try {
        setIsLoading(true);
        const { cartItemsLatest, loginUserLatest } = await updatedCartItems();
        if (loginUser) {
          // update DB
          await updateMember({ ...loginUserLatest, cartItem: cartItemsLatest });
          // update state
          dispatch({
            type: "UPDATE_CART",
            payload: {
              ...state,
              loginUser: { ...loginUserLatest, cartItem: cartItemsLatest },
            },
          });
          setIsLoading(false);
        }

        if (!loginUser) {
          setIsLoading(true);
          await wait(300);
          // update local
          localStorage.setItem("localCart", JSON.stringify(cartItemsLatest));
          // update state
          dispatch({
            type: "UPDATE_CART",
            payload: { ...state, localCart: cartItemsLatest },
          });
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    };
  }

  return { updateCartThunk, error, setError, isLoading, setIsLoading };
}

export default useUpdateCart;
