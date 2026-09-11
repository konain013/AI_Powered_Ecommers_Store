import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "e-store-cart";

const initialState = {
  items: [],
};

const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    return savedCart ? JSON.parse(savedCart) : initialState;
  } catch {
    return initialState;
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price),
            image: product.image,
            category: product.category,
            quantity: 1,
          },
        ],
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [state]);

  const addToCart = (product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: product,
    });
  };

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

  const removeFromCart = (productId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: productId,
    });
  };

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
        (total, item) => total + item.price * item.quantity,
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