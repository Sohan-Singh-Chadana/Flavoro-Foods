import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decrementCartItems,
  incrementCartItems,
  removeFromCart,
} from "../store/slices/cartSlice";
import FoodData from "../data/FoodData";
import toast from "react-hot-toast";

const ItemCard = ({ item }) => {
  const { img, name, price, quantity, id } = item;
  const dispatch = useDispatch();

  const singleProductPrice = FoodData.filter((item) => item.id === id)[0].price;

  return (
    <div>
      {/* Item card container */}
      <div className="flex gap-3 shadow-md bg-gray-100 dark:bg-zinc-700 rounded-lg p-2 mt-2 mb-3 relative">
        {/* Delete icon */}
        <MdDelete
          onClick={() => {
            dispatch(removeFromCart({ id }));
            toast(`${name} Removed !`, {
              icon: "👋",
            });
          }}
          className="absolute right-5 text-xl cursor-pointer"
        />
        {/* Item image */}
        <img src={img} alt="Pizza" className="w-14 h-14" />
        {/* Item details */}
        <div className=" w-full flex flex-col gap-2 leading-8">
          {/* Item name */}
          <h2 className="text-xl text-gray-800 dark:text-zinc-100 font-bold">
            {name.slice(0, 20)}...
          </h2>
          {/* Item price and quantity */}
          <div className="flex justify-between flex-row-reverse  items-center ">
            {/* Item price */}
            <span className="text-green-500 font-bold text-xl">₹{price}</span>
            {/* Quantity controls */}
            <div className="flex items-center gap-2">
              {/* Increase quantity */}
              <FaPlus
                onClick={() =>
                  dispatch(
                    incrementCartItems({ id, price: singleProductPrice })
                  )
                }
                className="Qun-btn"
              />
              {/* Current quantity */}
              <span>{quantity}</span>
              {/* Decrease quantity */}
              <FaMinus
                onClick={() =>
                  dispatch(
                    decrementCartItems({ id, price: singleProductPrice })
                  )
                }
                className="Qun-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
