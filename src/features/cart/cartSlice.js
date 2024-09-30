import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  priority: false,
};

// Creates a Redux slice for managing cart state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // Adds a new item to the cart
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // Removes an item from the cart by pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // Increases the quantity of an item in the cart
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // Decreases the quantity of an item in the cart
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // Deletes the item if quantity reaches zero
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      // Clears all items from the cart
      state.cart = [];
    },
    togglePriority(state, action) {
      // Toggles the priority status of the cart
      state.priority = action.payload;
    },
  },
});

// Exporting actions
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  togglePriority,
} = cartSlice.actions;

// Exporting reducer
export default cartSlice.reducer;

// Selector for accessing cart state
export const getCart = (state) => state.cart.cart;

// Selector for total quantity of items in the cart
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Selector for total price of items in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Selector for the current quantity of a specific item by pizzaId
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
