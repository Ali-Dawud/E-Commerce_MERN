import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

function CartPage() {
  const { cartItems, totalAmount, updateItemInCart, deleteItemInCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleDeleteItem = (productId: string) => {
    deleteItemInCart(productId);
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>My Cart</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              border: 1,
              borderColor: "#f5f5f5",
              borderRadius: 5,
              padding: 1,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <img width={"100px"} height={"100px"} src={item.image} />
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} X {item.unitPrice} USD
                </Typography>
                <Button onClick={() => handleDeleteItem(item.productId)} color="error">REMOVE ITEM</Button>
              </Box>
            </Box>

            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
              <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h4">
            Total Amount: {totalAmount.toFixed(2)} USD
          </Typography>
          <Button variant="contained">Go To Checkout</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CartPage;
