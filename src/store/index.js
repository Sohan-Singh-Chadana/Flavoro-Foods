import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer, {
  persistCartToLocalStorage,
} from "./slices/cartSlice";
import categoriesSliceReducer from "./slices/categorySlice";
import searchSliceReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartSliceReducer,
    categories: categoriesSliceReducer,
    search: searchSliceReducer,
  },
});

// Call the function to persist the cart to localStorage on state changes
persistCartToLocalStorage(store);

// console.log(store);
