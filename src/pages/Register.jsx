import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const success = await register(email, password);
      if (success) {
        setLoading(false);
        navigate("/login");
      } else {
        setError("Registration failed. Email may already exist.");
        setLoading(false);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        
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
              placeholder="Enter password (min 6 characters)"
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

          <div className="form-group password-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="checkbox-row">
              <button
                type="button"
                className="text-toggle"
                onClick={() => setShowConfirm(s => !s)}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? "Hide confirm password" : "Show confirm password"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
