import ProductCard from "@/components/ProductCard";
import Currency from "@/interfaces/Currency";
import Product from "@/interfaces/Product";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PRODUCTS: Product[] = [
  {
    name: "facu",
    productCode: "facu",
    brand: "facu",
    stock: 5,
    price: 300,
    currency: Currency.USD,
  },
  {
    name: "pato",
    productCode: "pato",
    brand: "pato",
    stock: 50,
    price: 450,
    currency: Currency.USD,
    imageUrl:
      "https://img.freepik.com/foto-gratis/hoja-naturaleza-fondos-patron-ilustracion-planta-telon-fondo-diseno-abstracto-naturaleza-verde-vibrante-papel-tapiz-ilustracion-generativa-ai_188544-12680.jpg?w=1060&t=st=1702792509~exp=1702793109~hmac=ef7811c6a83b96b7127594913216ed783503c59f5573793cd42ae0047a350a61",
  },
  {
    name: "push",
    productCode: "push",
    brand: "push",
    stock: 8,
    price: 100,
    currency: Currency.USD,
    imageUrl:
      "https://img.freepik.com/foto-gratis/hoja-naturaleza-fondos-patron-ilustracion-planta-telon-fondo-diseno-abstracto-naturaleza-verde-vibrante-papel-tapiz-ilustracion-generativa-ai_188544-12680.jpg?w=1060&t=st=1702792509~exp=1702793109~hmac=ef7811c6a83b96b7127594913216ed783503c59f5573793cd42ae0047a350a61",
  },
];

export default function ProductList() {
  return (
    <>
      <Typography>Productos</Typography>
      <Button>arrow Left</Button>
      <Button>ToggleView</Button>
      <Button>Nuevo</Button>
      <Button>Filter</Button>
      <Grid container>
        {PRODUCTS.map((product, index) => (
          <Grid key={product.name} item xs={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
