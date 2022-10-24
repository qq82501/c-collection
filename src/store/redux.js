import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
  categoryPath: "",
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        selectedCategory: action.payload.selected,
        categoryPath: action.payload.categoryPath,
      };
    default:
      return state;
  }
};

const store = configureStore({ reducer: reducer });

export default store;
