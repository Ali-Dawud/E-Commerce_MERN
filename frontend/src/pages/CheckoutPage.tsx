import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField, } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";

function CheckoutPage() {
  const { cartItems, totalAmount, } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);

   const renderCartItems = () => (
    <Box display="flex" flexDirection="column" gap={4} marginTop={2}
              sx={{
            border: 1,
            borderColor: "#f5f5f5",
            borderRadius: 5,
            padding: 2,
          }}>
      {cartItems.map((item) => (
        <Box
          key={item.productId}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={1} width="100%">
            <img width={50} src={item.image} />
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} X {item.unitPrice} USD
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="body2" sx={{textAlign:"right"}}>
          Total Amount: {totalAmount.toFixed(2)} USD
        </Typography>
      </Box>
    </Box>
   )

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" >
        <Typography variant="h4">CheckOut</Typography>
      </Box>
        <TextField inputRef={addressRef} name="address" label="Delivery Address" variant="outlined" fullWidth sx={{mt:1}}/>
        {renderCartItems()}
        <Button variant="contained" fullWidth sx={{mt:1}}>Pay Now</Button>
    </Container>
  );
}

export default CheckoutPage;
