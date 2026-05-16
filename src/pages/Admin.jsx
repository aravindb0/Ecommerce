import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Admin.css";
import API_URL from "../services/api";

function Admin() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getProductName = (product) => product?.name || product?.title || "Unnamed product";

  const getProductImageUrl = (product) => {
    return product?.img || product?.image || product?.imageUrl || "";
  };

  const formatProductPrice = (product) => {
    const value = Number(product?.price);
    return Number.isFinite(value) ? value.toFixed(2) : "0.00";
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  // Fetch existing products
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !price || !img) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, price: parseFloat(price), img })
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Product added successfully!");
        setName("");
        setPrice("");
        setImg("");
        await fetchProducts();
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Error adding product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    const productName = getProductName(product);
    const confirmed = window.confirm(`Delete ${productName}?`);
    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(product._id);

    try {
      const res = await fetch(`${API_URL}/api/products/${product._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Product deleted successfully!");
        setProducts((prev) => prev.filter((p) => p._id !== product._id));
      } else {
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
      console.error(err);
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>

      <div className="admin-content">
        <div className="admin-form-section">
          <h2>Add New Product</h2>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleAdd} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="img">Image URL</label>
              <input
                id="img"
                type="url"
                placeholder="Enter image URL"
                value={img}
                onChange={e => setImg(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="admin-submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        <div className="admin-products-section">
          <h2>Products List ({products.length})</h2>
          <div className="products-table">
            <div className="table-header">
              <div>Name</div>
              <div>Price</div>
              <div>Image</div>
              <div>Image URL</div>
              <div>Action</div>
            </div>
            {products.map(product => (
              <div key={product._id} className="table-row">
                <div>{getProductName(product)}</div>
                <div>₹{formatProductPrice(product)}</div>
                <div>
                  {getProductImageUrl(product) ? (
                    <img src={getProductImageUrl(product)} alt={getProductName(product)} className="table-image" />
                  ) : (
                    <span className="no-image-text">No image</span>
                  )}
                </div>
                <div>
                  {getProductImageUrl(product) ? (
                    <a
                      href={getProductImageUrl(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="image-url-link"
                    >
                      {getProductImageUrl(product)}
                    </a>
                  ) : (
                    <span className="no-image-text">No URL</span>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product._id}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;