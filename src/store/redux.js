import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  localFavorite: [],
  localCart: [],
  products: [],
  loginUser: null,
  selectedDelivery: null,
  deviceMode: window.innerWidth < 900 ? "mobile" : "pc",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "SYNC_STATE_DATA": {
      return action.payload;
    }
    case "UPDATE_FAV": {
      const updatedState = action.payload;
      return updatedState;
    }

    case "UPDATE_CART": {
      const updatedState = action.payload;
      return updatedState;
    }

    case "REMOVE_CART_ITEM": {
      const updatedState = action.payload;
      return updatedState;
    }

    case "SET_DELIVERY": {
      return { ...state, selectedDelivery: action.payload };
    }
    case "SUBMIT_ORDER": {
      return {
        ...state,
        loginUser: { ...state.loginUser, order: action.payload, cartItem: [] },
      };
    }
    case "LOGIN": {
      const user = action.payload;
      return {
        ...state,
        localFavorite: [],
        localCart: [],
        loginUser: user,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("loginUser");
      return { ...state, loginUser: null };
    }

    case "UPDATE_PROFILE": {
      console.log("updating", action.payload);

      return { ...state, loginUser: { ...state.loginUser, ...action.payload } };
    }

    case "SET_DEVICE_MODE": {
      return { ...state, deviceMode: action.payload };
    }

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
