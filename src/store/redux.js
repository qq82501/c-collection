import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  localFavorite: [],
  localCart: [],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "INITIAL_LOCAL_DATA": {
      return {
        localFavorite: action.payload.fav,
        localCart: action.payload.cart,
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
      localStorage.setItem(
        "localCart",
        JSON.stringify([...state.localCart, action.payload])
      );
      return {
        ...state,
        localCart: [...state.localCart, action.payload],
      };

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
