import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  localFavorite: [],
  localCart: [],
  products: [],
  loginUser: null,
  selectedDelivery: null,
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
    case "CREATE_ORDER": {
      const orders = state.loginUser.order ? [...state.loginUser.order] : [];
      orders.push(action.payload.orderNo);
      return initialState;
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
    case "TEST":
      console.log("redux test");
      return state;

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
