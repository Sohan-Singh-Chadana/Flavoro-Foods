### CategoryMenu.jsx my Code

```javascript
//* Node_modules
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

// * Store
import { setCategories as setCategory } from "../store/slices/categorySlice";
import FoodData from "../data/FoodData";

const CategoryMenu = () => {
  const [categories, setCategories] = useState(["All"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    // Update the URL search parameters with the selected category
    setSearchParams({ category });
    // Update the category in the Redux store
    dispatch(setCategory({ category }));
  };

  const listUniqueCategories = () => {
    // Extract unique categories from FoodData and update the categories state
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)),
    ];
    // Update the categories state by merging the existing categories with the unique categories from FoodData
    setCategories((prevState) => [
      ...new Set([...prevState, ...uniqueCategories]),
    ]);
  };

  useEffect(() => {
    // Fetch and update unique categories when the component mounts
    listUniqueCategories();
  }, []);

  return (
    <div className="container mx-auto my-4">
      <div>
        <h2 className="text-3xl font-bold mb-2">Find the best food</h2>
        <div className="flex overflow-x-auto  gap-3  category-section scroll-smooth">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={` category-btn ${
                selectedCategory === category
                  ? "bg-green-500   text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-zinc-100"
              }  `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
```

### categorySlice.js My Code

```javascript
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
```

### FoodItem.jsx my Code

```javascript
import React, { useEffect } from "react";
import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";
import FoodData from "../data/FoodData";

const FoodItems = () => {
  const category = useSelector((state) => state.categories.categories);

  return (
    <>
      <div className="container mx-auto flex flex-wrap justify-center lg:justify-between gap-10 my-10">
        {category.length > 0 ? (
          category.map(({ id, img, name, price, desc, category, rating }) => (
            <FoodCard
              key={id}
              id={id}
              name={name}
              img={img}
              price={price}
              desc={desc}
              category={category}
              rating={rating}
            />
          ))
        ) : (
          <p className="text-lg text-center text-gray-500 dark:text-gray-300">
            No items found for the selected category.
          </p>
        )}
      </div>
    </>
  );
};

export default FoodItems;
```
