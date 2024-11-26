import React, { useEffect, useState, useMemo } from "react";
import { MdClose } from "react-icons/md";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cartItems.cart);
  const navigate = useNavigate();

  // Calculate total price and total items using useMemo to prevent unnecessary re-computation
  const { totalPrice, totalItems } = useMemo(() => {
    // Calculate the total cost of the items in the cart
    const totalPrice = cartItems
      .map((item) => item.price)
      .reduce((acc, curValue) => acc + curValue, 0);

    // Calculate the total number of items in the cart
    const totalItems = cartItems.reduce(
      (acc, curValue) => acc + curValue.quantity,
      0
    );

    return { totalPrice, totalItems };
  }, [cartItems]);

  // Toggle cart visibility
  const toggleCart = () => setActiveCart((prev) => !prev);

  // Handle checkout
  const handleCheckout = () => navigate("/success");

  return (
    <>
      {/* // Cart main container */}
      <div
        className={`fixed right-0 top-0 w-full lg:w-[30vw] xl:w-[25vw] bg-[#fff] dark:bg-zinc-800 h-screen transition-all duration-500 ease-linear z-50 ${
          activeCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300  h-[10vh] shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
            My Order
          </h1>
          {/* Close cart button */}
          <MdClose
            onClick={toggleCart}
            className="border-2 border-gray-600 dark:border-gray-100 dark:text-zinc-100 text-gray-600 font-bold  text-xl rounded-md hover:text-green-300 hover:border-green-300 cursor-pointer"
          />
        </div>

        {/* Cart items container */}
        <div className="h-[73vh] lg:h-[77vh] scrollbar-none    overflow-y-scroll px-2 lg:px-2 py-2">
          {/* Map through cart items and render ItemCard component */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              return <ItemCard key={index} item={item} />;
            })
          ) : (
            <p className="text-gray-600 dark:text-zinc-100 text-xl text-center my-5 font-bold">
              Your cart is empty
            </p>
          )}
        </div>

        {/* Cart footer */}
        <div className="absolute left-0 bottom-4 right-0 bg-[#ffffff] dark:bg-zinc-800 py-2  px-3 border-t border-gray-300 ">
          {/* Display total items and amount */}
          <h3 className="flex justify-between items-center font-semibold text-gray-800 dark:text-zinc-100">
            <span>Items : </span>
            <span>{totalItems}</span>
          </h3>
          <h3 className="flex justify-between items-center font-semibold text-gray-800 dark:text-zinc-100">
            <span>Total Amount : </span>
            <span>₹ {totalPrice}</span>
          </h3>
          <hr className="my-2" />
          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            className="bg-green-500 font-bold px-3 text-white py-2 rounded-lg w-[90vw] lg:w-full "
          >
            Checkout
          </button>
        </div>
      </div>

      {/* cart toggle button */}
      <div
        onClick={() => setActiveCart((prevState) => !prevState)}
        className={`fixed right-2 bottom-2 cursor-pointer  rounded-full shadow-xl  bg-zinc-200 p-2  ${
          cartItems.length > 0
            ? "animate-bounce transition-all delay-500"
            : "animate-none"
        }`}
      >
        <FaCartShopping className="text-3xl text-green-500" />
      </div>
    </>
  );
};

export default Cart;
