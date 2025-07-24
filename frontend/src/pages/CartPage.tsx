import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

function CartPage() {
  const { token } = useAuth();
  const [cart, setCart] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch("http://localhost:3001/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. Please try again");
      }

      const data = await response.json();
      setCart(data);
    };

    fetchCart();
  }, [token]);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>;
  }

  console.log({ cart });
  return (
    <Container sx={{ mt: 2 }}>
      <Typography>My Cart</Typography>
    </Container>
  );
}

export default CartPage;
