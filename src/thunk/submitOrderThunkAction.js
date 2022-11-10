import { updateMember } from "../helper/helper";

export function submitOrder(order) {
  console.log(order);
  return async function submitOrdertThunk(dispatch, getState) {
    const { loginUser } = getState();
    const userOrderList = loginUser?.order ? [...loginUser.order] : [];

    const addOrder = async function () {
      await fetch(
        "https://c-collection-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );
    };

    await addOrder();
    userOrderList.push(order.orderNo);
    await updateMember({ ...loginUser, cartItem: [], order: userOrderList });
    dispatch({ type: "SUBMIT_ORDER", payload: userOrderList });
  };
}
