import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  recipeList: [],
  detailPage: [],
  savedList: [],
  savedState: false,
  loading: false,
  result:false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialState,
  reducers: {
    setRecipeList(state, action) {
      state.recipeList = action.payload;
    },
    setDetailPage(state, action) {
      state.detailPage = action.payload;
    },
    setSavedList(state, action) {
      state.savedList = action.payload;
    },
    setSavedState(state, action) {
      state.savedState = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setResult(state,action){
      state.result=action.payload;
    }
  },
});

export const search = (searchInput) => {
  return async (dispatch) => {
    try {
      dispatch(recipeAction.setLoading(true));
      const APP_KEY = import.meta.env.VITE_REACT_KEY;
      const APP_ID = import.meta.env.VITE_REACT_ID;
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchInput}`
      );
      console.log(response);
      if (response.data.hits.length > 0) {
        dispatch(recipeAction.setRecipeList(response.data.hits));
        dispatch(recipeAction.setResult(true));
      }else{
        dispatch(recipeAction.setResult(false));
      }

      // Set the response data to the state variable
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
    }
    dispatch(recipeAction.setLoading(false));
  };
};

export const recipeAction = recipeSlice.actions;
export default recipeSlice.reducer;
