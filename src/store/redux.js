import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  localFavorite: [],
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "INITIAL_FAV_DATA": {
      return { ...state, localFavorite: action.payload };
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

    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
