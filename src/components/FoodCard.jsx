import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { ThemeContext } from "../context/ThemeContext";

const FoodCard = ({
  id,
  name = "",
  img,
  price,
  desc = "",
  category,
  rating,
}) => {
  const dispatch = useDispatch();
  const { handleToast } = useContext(ThemeContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ img, id, name, price, quantity: 1 }));
    handleToast(name);
  };

  return (
    <Link
      to={`/detailPage/${id}`}
      className="font-semibold w-[250px]  bg-white dark:bg-zinc-800 p-3 flex flex-col gap-3 rounded-lg overflow-hidden"
    >
      <img
        src={img}
        alt=""
        className="w-full h-[150px] object-cover rounded-lg hover:scale-110 transition-all duration-500 ease-in-out"
      />
      <div className="flex justify-between items-center text-base">
        <h2>{name.slice(0, 20)}...</h2>
        <p className="text-green-500 flex items-center justify-center align-middle">
          <span className="pr-0.5 ">₹</span>
          <span>{price}</span>
        </p>
      </div>
      <p className="font-normal text-base">{desc.slice(0, 50)}...</p>
      <div className="flex items-center justify-between text-lg">
        <span className="flex items-center gap-2 justify-center ">
          <FaStar className="text-yellow-400" /> {rating}
        </span>
        <button
          onClick={handleAddToCart}
          className="py-1.5 px-3 text-white bg-green-500 hover:bg-green-600 rounded-lg text-base transition duration-200 ease-in tracking-wide font-bold"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default FoodCard;
