import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipe-slice";

const Store = configureStore({
  reducer: { recipe: recipeSlice },
});

export default Store;
