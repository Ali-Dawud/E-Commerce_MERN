import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";

function CartPage() {
  const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   const fetchCart = async () => {
  //     const response = await fetch("http://localhost:3001/cart", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       setError("Failed to fetch user cart. Please try again");
  //     }
  //     const data = await response.json();
  //     setCart(data);
  //   };
  //   fetchCart();
      
  // }, [token]);
  // console.log(cart);

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">My Cart</Typography>
        {cartItems.map( (item) => (item.title))}
      </Box>
    </Container>
  );
}

export default CartPage;
