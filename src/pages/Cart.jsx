import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/" className="continue-shopping">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => decreaseQty(item._id)}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-display">{item.qty}</span>
                <button 
                  onClick={() => increaseQty(item._id)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <p className="item-subtotal">
                ₹{(item.price * item.qty).toFixed(2)}
              </p>

              <button 
                onClick={() => removeFromCart(item._id)}
                className="remove-btn"
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({itemCount}):</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{(total * 1.05).toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;