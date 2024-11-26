//* Node_modules
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

// * Store
import { setCategories as setCategory } from "../store/slices/categorySlice";
import FoodData from "../data/FoodData";

const CategoryMenu = () => {
  const [categories, setCategories] = useState(["All"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const dispatch = useDispatch();
  // const selectedCategory = useSelector(
  //   (state) => state.categories.selectedCategory
  // );

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
    <div className="container mx-auto my-4 lg:px-4">
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
