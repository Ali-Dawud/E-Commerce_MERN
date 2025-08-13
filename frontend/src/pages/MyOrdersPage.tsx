import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
// import type { CartItem } from "../types/CartItem";

function MyOrdersPage() {
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "500px",
        gap: 2,
      }}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">Orders</Typography>
      </Box>
      {myOrders.map(({address ,orderItems,total }) => (
        <Box sx={{border: 1, borderColor: "gray", borderRadius: 2, padding: 1}}>
          <Typography>Address: {address} </Typography>
          <Typography>Items: {orderItems.length} </Typography>
          <Typography>Total: {total.toFixed(2)} USD</Typography>
        </Box>
      ))}
    </Container>
  );
}

export default MyOrdersPage;
