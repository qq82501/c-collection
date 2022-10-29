import { useState } from "react";
import { useDispatch } from "react-redux";

function useAddCart(productItem) {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const setErrorHandler = function (error) {
    setError(error);
  };

  const addToCartHandler = function (_, spec = null, quantity, e) {
    const isAddFromCart = productItem.hasOwnProperty("imgPath");
    const cartUpdatedQuantity = +e.target.value - quantity;
    console.log(cartUpdatedQuantity);
    // if (isAddFromCart && e.target.value < quantity) return;

    if (productItem.spec?.length > 0 && !spec) {
      return setError("請選擇規格");
    }

    setError(null);
    const product = {
      productNo: isAddFromCart
        ? `${productItem.productNo}`
        : `${productItem.productNo}${spec ? `-${spec}` : ""}`,
      title: productItem.title,
      price: productItem.price,
      imgPath: isAddFromCart
        ? productItem.imgPath
        : `${productItem.productNo}/${productItem.imgs[0]}`,
      spec: spec,
      quantity: isAddFromCart ? cartUpdatedQuantity : quantity,
    };

    console.log("ADD TO CART", product);
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
