import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      if (data) {
        setLoading(false);
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="checkbox-row">
              <button
                type="button"
                className="text-toggle"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;