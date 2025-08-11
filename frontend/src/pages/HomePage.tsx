import { Box, Container, Grid } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(`${BASE_URL}products`);
        const data = await response.json();
        setProducts(data);
      };
      fetchData();
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>;
  }
  
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
