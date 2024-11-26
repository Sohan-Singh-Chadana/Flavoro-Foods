import { createSlice } from "@reduxjs/toolkit";
import FoodData from "../../data/FoodData";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: JSON.parse(localStorage.getItem("categories")) || FoodData, // Default to all data if none in storage
    selectedCategory: "All", // Default category
  },
  reducers: {
    setCategories(state, action) {
      const { category } = action.payload;
      state.selectedCategory = category;

      // Filter data based on the selected category
      const filteredData =
        category === "All"
          ? FoodData
          : FoodData.filter((item) => item.category === category);

      // Update the categories state with the filtered data
      state.categories = filteredData;

      // Update local storage based on the selected category
      if (category !== "All") {
        // Store filtered data in local storage when a specific category is selected
        localStorage.setItem("categories", JSON.stringify(filteredData));
      } else {
        // Remove stored categories when 'All' category is selected
        localStorage.removeItem("categories");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
