import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";

const FoodItems = () => {
  const category = useSelector((state) => state.categories.categories);
  const searchQuery = useSelector((state) => state.search.search);

  const filteredFoods = category.filter((food) => {
    if (!searchQuery.trim()) {
      return true; // return all foods if search query is empty
    }
    return food.name.toLowerCase().includes(searchQuery.toLowerCase()); // filter foods by search query
  });

  return (
    <>
      {/* <div className="container mx-auto flex flex-wrap justify-center lg:justify-between gap-10 my-10"> */}
      <div className={`container mx-auto grid-custom my-10 relative `}>
        {filteredFoods.length > 0 ? (
          filteredFoods.map(
            ({ id, img, name, price, desc, category, rating }) => (
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
            )
          )
        ) : (
          <p className="text-2xl w-full p-5 m-5 text-center text-gray-500 dark:text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            No items found for the selected category.
          </p>
        )}
      </div>
    </>
  );
};

// category.length > 0 ? (
//   category.map(({ id, img, name, price, desc, category, rating }) => (
// <FoodCard
//   key={id}
//   id={id}
//   name={name}
//   img={img}
//   price={price}
//   desc={desc}
//   category={category}
//   rating={rating}
// />
//   ))
// )

export default FoodItems;
