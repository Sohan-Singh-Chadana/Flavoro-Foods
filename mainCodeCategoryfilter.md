### CategoryMenu.jsx Code

```javascript
//* Node_modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// * Store
import { setCategories as setCategory } from "../store/slices/categorySlice";
import FoodData from "../data/FoodData";

const CategoryMenu = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.categories.category);
  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  return (
    <div className="container mx-auto my-4">
      <div>
        <h2 className="text-3xl font-bold mb-2">Find the best food</h2>
        <div className="flex overflow-x-auto  gap-3  category-section scroll-smooth">
          <button
            onClick={() => dispatch(setCategory("All"))}
            className={`category-btn ${
              selectedCategory === "All" && "text-white bg-green-500"
            } bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-zinc-100`}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => dispatch(setCategory(category))}
              className={`category-btn ${
                selectedCategory === category && "bg-green-500 text-white"
              }
              bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-zinc-100 `}
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

### CategorySlice.js Code

```javascript
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "All",
  },
  reducers: {
    setCategories(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
```

### FoodItems.jsx Code

```javascript
import React, { useEffect } from "react";
import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";
import FoodData from "../data/FoodData";

const FoodItems = () => {
  const category = useSelector((state) => state.categories.category);

  return (
    <>
      <div className="container mx-auto flex flex-wrap justify-center lg:justify-between gap-10 my-10">
        {FoodData.filter((food) => {
          if (category === "All") {
            return food;
          } else {
            return food.category === category;
          }
        }).map(({ id, img, name, price, desc, category, rating }) => (
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
        ))}
      </div>
    </>
  );
};

export default FoodItems;
```
