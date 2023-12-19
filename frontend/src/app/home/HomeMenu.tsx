import HomeCard from "@/components/HomeCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface HomeLink {
  name: string;
  href: string;
}

const LINKS: HomeLink[] = [
  { name: "Facturación", href: "/bill" },
  { name: "Prodcutos", href: "/product/list" },
  { name: "Clientes", href: "/client" },
];

const LINK_DOLAR: HomeLink = {
  name: "Cotización del Dólar",
  href: "/dolar-values",
};

export default function HomeMenu() {
  return (
    <>
      <Grid item xs={12} textAlign={"center"}>
        <Typography>Control de Stock</Typography>
      </Grid>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {LINKS.map((link) => (
          <Grid item xs={6} key={link.name}>
            <Link href={link.href}>
              <HomeCard title={link.name} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} my={2}>
        <Link href={LINK_DOLAR.href}>
          <HomeCard title={LINK_DOLAR.name} />
        </Link>
      </Grid>
    </>
  );
}
