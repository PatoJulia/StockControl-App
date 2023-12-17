import { Product, ProductCard } from "@/components/ProductCard";
import { Box, Grid } from "@mui/material";

const PRODUCTS: Product[] = [
  {
    name: "facu",
  },
  {
    name: "pato",
  },
  {
    name: "push",
  },
];

export default function ProductsList() {
  return (
    <>
      <Grid container>
        {PRODUCTS.map((product: Product) => (
          <ProductCard product={product} key={product.name}></ProductCard>
        ))}
      </Grid>
    </>
  );
}
