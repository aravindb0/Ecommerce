import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart, search, setSearch } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* LEFT SIDE (Logo) */}
        <Link to="/" className="nav-logo">
          Mart
        </Link>

        {/* CENTER (Search) */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* RIGHT SIDE (Links) */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link">
            Cart ({cart.length})
          </Link>
          {user && user.role === "admin" && (
            <Link to="/admin" className="nav-link admin-link">Admin</Link>
          )}
          {user ? (
            <>
              <span className="user-welcome">{user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;