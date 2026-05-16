import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, search, setSearch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;