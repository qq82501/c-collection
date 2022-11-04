import { useState } from "react";
import { useDispatch } from "react-redux";

function useAddCart(productItem) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const setErrorHandler = function (error) {
    setError(error);
  };

  const addToCartHandler = function (addedItem, e) {
    let cartUpdatedQuantity;
    if (addedItem.isAddFromCart) {
      cartUpdatedQuantity = +e.target.value - addedItem.quantity;
    }

    if (productItem.spec?.length > 0 && !addedItem.spec) {
      return setError("請選擇規格");
    }

    setError(null);
    const product = {
      productNo: productItem.productNo,
      productDetailNo: addedItem.isAddFromCart
        ? `${productItem.productNo}`
        : `${productItem.productNo}${
            addedItem.spec ? `-${addedItem.spec}` : ""
          }`,
      title: productItem.title,
      price: productItem.price,
      imgPath: addedItem.isAddFromCart
        ? productItem.imgPath
        : `${productItem.productNo}/${productItem.imgs[0]}`,
      spec: productItem.spec,
      selectedSpec: addedItem.spec,
      quantity: addedItem.isAddFromCart
        ? cartUpdatedQuantity
        : addedItem.quantity,
    };

    dispatch({ type: "ADD_CART", payload: product });

    // fetcher.submit(
    //   {
    //     ...product,
    //   },
    //   { method: "POST", action: "/addToCart" }
    // );
  };

  return {
    addToCartHandler,
    error: error,
    setErrorHandler,
  };
}

export default useAddCart;
