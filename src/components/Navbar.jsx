import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/searchSlice";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );
  const [search, setSearch] = useState(""); // Local state for search input

  // Debounced search handler
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchQuery(search.trim())); // Dispatch search query after debounce
    }, 300); // debounce delay : 300ms
    return () => clearTimeout(timeout); // Clear timeout on unmount search change
  }, [search, dispatch]); // Re-run on search change

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success(
      `${theme === "light" ? "dark" : "light"} Theme Switched Successfully!`,
      {
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: `${theme === "light" ? "#333" : "#fff"}`,
          color: `${theme === "light" ? "#fff" : "#333"}`,
        },
      }
    );
  };

  const handleLogoClick = () => {
    navigate(`/?category=${selectedCategory}`);
  };

  return (
    <>
      <nav className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 lg:gap-0 lg:px-4  py-5 container mx-auto mb-5 lg:mb-10">
        <div className="flex items-center justify-between  lg:flex-col-reverse lg:items-start">
          <h3 className="text-xl font-bold text-gray-600 dark:text-zinc-100">
            {new Date().toLocaleString("en-GB", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h3>
          <div className="flex gap-5 items-center">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={handleLogoClick}
            >
              Flavoro Foods
            </h1>
            <button
              onClick={handleThemeToggle}
              className="bg-zinc-200 ring-1 ring-zinc-200 dark:bg-zinc-600 p-1 rounded-lg"
            >
              {theme === "light" ? (
                <MdOutlineNightlight className="text-xl dark:text-white" />
              ) : (
                <MdOutlineLightMode className="text-xl dark:text-white" />
              )}
            </button>
          </div>
        </div>
        <div>
          <input
            value={search}
            onInput={(e) => setSearch(e.target.value)} // update search state
            type="search"
            name="search"
            placeholder="Search here"
            autoComplete="off"
            className="p-2 lg:p-3 border border-gray-400 text-base rounded-lg outline-none w-full lg:w-[400px] dark:bg-zinc-800 "
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
