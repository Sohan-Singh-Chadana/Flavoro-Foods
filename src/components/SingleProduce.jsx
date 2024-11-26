import React, { useContext, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import FoodData from "../data/FoodData";
import FoodCard from "./FoodCard";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext";

const SingleProduce = () => {
  const productID = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleToast } = useContext(ThemeContext);
  const searchQuery = useSelector((state) => state.search.search);

  const productFilter = FoodData.find(
    (item) => item.id === parseInt(productID.id)
  );

  if (!productFilter) {
    return (
      <div className="text-center my-10 flex items-center justify-center flex-col gap-5 h-screen">
        <h1 className="text-3xl font-bold">Product Not Found 😒</h1>
        <button
          onClick={() => window.history.back()}
          className="py-2 px-4 bg-green-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { id, img, name, price, desc, rating, category } = productFilter;

  const foodFilterCategory = useMemo(
    () =>
      // Filter food data based on category and search query
      FoodData.filter((item) => {
        if (!searchQuery.trim()) {
          // If search query is empty, filter by category and exclude current product
          return item.category === category && item.id !== productFilter.id;
        } else {
          // If search query is not empty, filter by search query
          return item.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
      }),
    [category, productID.id, searchQuery]
  );

  return (
    <>
      {/* // Render the Navbar component */}
      <Navbar />

      {/* Product Details Section */}
      <div className="container mx-auto  flex  lg:items-start justify-center  gap-10 border-b border-gray-400 ">
        <div className="flex lg:items-start  lg:justify-between  gap-10   pb-10 lg:pb-20  lg:pt-10 flex-col lg:flex-row ">
          <div className="w-full">
            <img src={img} alt="" className="w-full object-cover rounded-lg" />
          </div>
          <div className="flex flex-col gap-5 w-full">
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex gap-5 items-center">
              <span className="flex items-center gap-2 justify-center  text-slate-500 dark:text-zinc-100">
                <FaStar className="text-yellow-400" /> {rating}
              </span>
              <p className="p-2 px-4 bg-gray-300 dark:bg-zinc-700 text-base font-medium rounded-xl ">
                {category}
              </p>
            </div>
            <p className="text-lg text-slate-500 lg:max-w-[100%] dark:text-zinc-100">
              {desc}
            </p>
            <h3 className="text-slate-800 dark:text-zinc-100 flex items-center  align-middle text-xl">
              <span className="pr-0.5 ">₹</span>
              <span>{price}</span>
            </h3>
            <div className="flex gap-5 items-center self-start">
              <button
                onClick={() => {
                  dispatch(addToCart({ img, id, name, price, quantity: 1 }));
                  handleToast(name);
                }}
                className="add-cart-btn"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className=" bg-green-500 py-2 px-6 rounded-lg  text-lg text-white active:bg-green-600 "
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Sections */}
      <div className="container mx-auto my-10">
        <h2 className="text-3xl font-bold">Similar Products</h2>
        {/* <div className="flex flex-wrap justify-center lg:justify-between gap-10 my-10 "> */}
        <div className="container mx-auto grid-custom my-10 md:gap-5 relative">
          {foodFilterCategory.length > 0 ? (
            foodFilterCategory.map(
              ({ id, name, img, price, desc, category, rating }, index) => (
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
            <p className="text-2xl w-full p-5 m-5 text-center text-gray-500 dark:text-gray-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              No items found for the selected category.
            </p>
          )}
        </div>
      </div>

      {/* // Render the Cart component */}
      <Cart />
    </>
  );
};

export default SingleProduce;
