import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: "Mediterranean",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const inCart = state.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload.pizzaId,
      );
      if (!inCart) {
        state.cart.push(action.payload);
      }
    },
    incrementQuantity(state, action) {
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      if (!cartItem) return;
      cartItem.quantity++;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
    },
    decreaseQuantity(state, action) {
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      if (cartItem.quantity === 0)
        cartSlice.caseReducers.deleteCartItem(state, action);
    },
    deleteCartItem(state, action) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.pizzaId !== action.payload,
      );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decreaseQuantity,
  deleteCartItem,
  clearCart,
} = cartSlice.actions;

export const getCartTotalPrice = (state) =>
  state.cart.cart.reduce((acc, curCartItem) => acc + curCartItem.totalPrice, 0);
export const getCartTotalItem = (state) =>
  state.cart.cart.reduce((acc, curCartItem) => acc + curCartItem.quantity, 0);

export default cartSlice.reducer;
