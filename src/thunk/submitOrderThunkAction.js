export function submitOrder(order) {
  return async function submitOrdertThunk(dispatch, getState) {
    const addOrder = async function () {
      const res = await fetch(
        "https://c-collection-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );
      console.log(res);
      dispatch({ type: "CREATE_ORDER", payload: order });
    };

    addOrder();
  };
}
