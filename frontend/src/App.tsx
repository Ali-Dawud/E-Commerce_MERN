import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
