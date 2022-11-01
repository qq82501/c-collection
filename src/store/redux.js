import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  localFavorite: [],
  localCart: [],
  products: [],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "INITIAL_LOCAL_DATA": {
      return {
        localFavorite: action.payload.fav,
        localCart: action.payload.cart,
        products: action.payload.products,
      };
    }
    case "ADD_FAV":
      localStorage.setItem(
        "localFav",
        JSON.stringify([...state.localFavorite, action.payload])
      );
      return {
        ...state,
        localFavorite: [...state.localFavorite, action.payload],
      };
    case "REMOVE_FAV":
      localStorage.setItem(
        "localFav",
        JSON.stringify(
          state.localFavorite.filter(
            (item) => item.productNo !== action.payload.productNo
          )
        )
      );
      return {
        ...state,
        localFavorite: state.localFavorite.filter(
          (item) => item.productNo !== action.payload.productNo
        ),
      };

    case "ADD_CART":
      const existedIndex = state.localCart.findIndex(
        (item) => item.productNo === action.payload.productNo
      );
      let newCartItems;
      if (existedIndex > -1) {
        let existedItem = Object.assign({}, state.localCart[existedIndex]);
        existedItem.quantity += action.payload.quantity;
        newCartItems = [...state.localCart];
        newCartItems[existedIndex] = existedItem;
      }
      if (existedIndex < 0) {
        newCartItems = [...state.localCart, action.payload];
      }
      localStorage.setItem("localCart", JSON.stringify(newCartItems));
      return {
        ...state,
        localCart: newCartItems,
      };
    case "REMOVE_CART_ITEM": {
      console.log(action.payload);

      const newCartItems = state.localCart.filter(
        (item) => item.productNo !== action.payload.productNo
      );
      localStorage.setItem("localCart", JSON.stringify(newCartItems));
      return { ...state, localCart: newCartItems };
    }

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
