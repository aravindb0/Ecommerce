import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-container">
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>{search ? "No products found matching your search" : "No products available"}</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;