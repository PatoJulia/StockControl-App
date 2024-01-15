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
  { name: "Clientes", href: "/client/id" },
];

const LINK_DOLAR: HomeLink = {
  name: "Cotización del Dólar",
  href: "/dolar-values",
};

const MOCK_PRODUCTS = [
  {
    name: "pato",
  },
  {
    name: "asd",
  },
  {
    name: "dnas",
  },
];

export default function HomeMenu() {
  return (
    <Box 
      sx={{
        marginTop: 2.5,
        //background: "linear-gradient(to bottom, #97CEEB, #FFA5F0 )",
       //background: "linear-gradient(to bottom, #7FC7D9, #ffffff)",
        background: "linear-gradient(to bottom, #D2E3C8, #D2E3C8)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box sx={{ marginTop: 2.5 } }>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h4" fontFamily="fantasy" fontStyle="italic">
            Control de Stock
          </Typography>
        </Box>
        
        <Grid container height={"50vh"} px={10} mt={5} display={"flex"} justifyContent={"center"}>
          {MOCK_PRODUCTS.map((product) => (
            <Grid key={product.name} item xs={3} height={"100%"}>
              <Box sx={{ border: "1px solid black" }} height={"100%"}>
                <Typography fontStyle="italic">
                  {product.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Grid
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={10}
          justifyContent="center"
          alignItems="center"
          wrap="wrap"
        >
          {LINKS.map((link) => (
           <Grid item xs={3} key={link.name}>
           <Link href={link.href} passHref>
             <div style={{ fontFamily: 'fantasy', color: 'black' }}>
               <HomeCard title={link.name} />
             </div>
           </Link>
         </Grid>
         
         
          
          ))}
          {/* Nuevo Grid item para Cotización del Dólar */}
          <Grid item xs={3} >
            <Link href={LINK_DOLAR.href}>
              <HomeCard title={LINK_DOLAR.name} />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}