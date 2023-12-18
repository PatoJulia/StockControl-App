import HomeCard from "@/components/HomeCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface NavigationModule {
  name: string;
  href: string;
}

const MODULES: NavigationModule[] = [
  {
    name: "Facturacion",
    href: "/bill",
  },
  {
    name: "Productos",
    href: "/product-list",
  },
  {
    name: "Clientes",
    href: "/client",
  },
  {
    name: "Valores del Dolar",
    href: "/dolar",
  },
];

export default function HomeMenu() {
  return (
    <>
      <Grid item xs={12}>
        <Typography>Control de Stock</Typography>
      </Grid>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {MODULES.map((module) => (
          <Grid item xs={6} key={module.name}>
            <Link href={module.href}>
              <HomeCard title={module.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
