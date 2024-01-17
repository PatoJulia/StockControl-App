"use client";
import HomeCard from "@/components/HomeCard";
import ProductCard from "@/components/ProductCard";
import Product from "@/interfaces/Product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HomeLink {
  name: string;
  href: string;
}

const LINKS: HomeLink[] = [
  { name: "Facturación", href: "/bill/list" },
  { name: "Productos", href: "/product/list" },
  { name: "Clientes", href: "/client/list" },
  { name: "Cotización del Dólar", href: "/dolar" },
];

export default function HomeMenu() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4300/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        marginTop: 2.5,
        //background: "linear-gradient(to bottom, #97CEEB, #FFA5F0 )",
        //background: "linear-gradient(to bottom, #7FC7D9, #ffffff)",
        //background: "linear-gradient(to bottom, #D2E3C8, #D2E3C8)",
        backgroundColor: "FFFFFF",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box sx={{ marginTop: 2.5 }}>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h4">Control de Stock</Typography>
        </Box>

        <Grid
          container
          height={"50vh"}
          px={10}
          mt={5}
          display={"flex"}
          justifyContent={"center"}
        >
          {products.splice(0, 4).map((product) => (
            <Grid item xs={5} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 5 }}
          marginTop={10}
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          {LINKS.map((link) => (
            <Grid item xs={3} key={link.name}>
              <Link href={link.href}>
                <HomeCard title={link.name} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}