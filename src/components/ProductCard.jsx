import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.img} 
          alt={product.name} 
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-price">₹{product.price.toFixed(2)}</p>
        <button 
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;