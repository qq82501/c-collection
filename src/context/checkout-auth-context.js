import React from "react";

const CheckoutAuthContext = React.createContext({
  storeError: null,
  deliveryError: null,
});
export default CheckoutAuthContext;
