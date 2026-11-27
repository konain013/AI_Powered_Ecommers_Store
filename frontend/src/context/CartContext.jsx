
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
} from "react";

import api from "../services/api";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload,
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload &&
          item.quantity < 100
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

const mapCartItems = (items = []) =>
  items.map((item) => ({
    id: item.productId,
    title: item.productName,
    price: Number(item.price),
    image: item.thumbnail,
    quantity: item.quantity,
  }));

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      dispatch({ type: "CLEAR_CART" });
      return;
    }

    try {
      const response = await api.get("/cart");

      dispatch({
        type: "SET_CART",
        payload: mapCartItems(
          response.data.cart?.items
        ),
      });
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  }, []);

  // Load cart when provider mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add product to backend cart
  const addToCart = async (product) => {
    if (!localStorage.getItem("token")) {
      throw new Error("Please login to add products to cart.");
    }

    try {
      const response = await api.post("/cart", {
        productId: Number(product.id),
        quantity: 1,
      });

      dispatch({
        type: "SET_CART",
        payload: mapCartItems(
          response.data.cart.items
        ),
      });

      return true;
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    }
  };

  // Local quantity operations
  const increaseQuantity = (productId) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: productId,
    });
  };

  const decreaseQuantity = (productId) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });
  };

  // Local remove operation
  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

  // Local clear operation
  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const itemCount = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};
