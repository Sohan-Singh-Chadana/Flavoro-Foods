import { createSlice } from "@reduxjs/toolkit";

// Helper to calculate item price based on quantity
const calculateItemPrice = (item, unitPrice) => item.quantity * unitPrice;

// Helper to find an item in the cart
const findCartItem = (state, action) =>
  state.cart.find((item) => item.id === action.payload.id);

const initialState = {
  cart: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { price } = action.payload;
      const existingItem = findCartItem(state, action);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.price = calculateItemPrice(existingItem, price);
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    incrementCartItems(state, action) {
      const { price } = action.payload;
      const existingItem = findCartItem(state, action);
      existingItem.quantity += 1;
      existingItem.price = calculateItemPrice(existingItem, price);
    },
    decrementCartItems(state, action) {
      const { price } = action.payload;
      const existingItem = findCartItem(state, action);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.price = calculateItemPrice(existingItem, price);
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});
// Persist cart to localStorage on each state update
export const persistCartToLocalStorage = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    const cartItems = state.cartItems.cart;

    if (cartItems && Array.isArray(cartItems)) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }

    if (cartItems.length === 0) {
      localStorage.removeItem("cartItems");
    }
  });
};

export const {
  addToCart,
  removeFromCart,
  incrementCartItems,
  decrementCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;
