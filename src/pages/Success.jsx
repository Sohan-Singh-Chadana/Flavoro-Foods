import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Success = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to home page after 3 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (!loading) {
  //       navigate("/");
  //     }
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [loading, navigate]);

  // handle redirect to home page
  const handleRedirect = () => navigate("/");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <PropagateLoader color="#60e165" size={25} />
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center items-center justify-center h-screen">
      <div>
        <h2 className="text-3xl font-semibold mb-4">Order Successful! ✅ 🎉</h2>
        <p className="text-2xl">Your order has been placed successfully.</p>
        <button
          onClick={handleRedirect}
          className="bg-green-500 text-white px-5 py-2 my-5 rounded-lg hover:bg-green-600 active:bg-green-500 w-[100px] text-xl"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Success;
