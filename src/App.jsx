import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;