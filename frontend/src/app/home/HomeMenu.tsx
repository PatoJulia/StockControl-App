import HomeCard from "@/components/homeCard";
import Box from "@mui/material/Box";
import  Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NAMES = ["Facturacion", "Productos", "Clientes", "Valores del Dolar"];

export default function HomeMenu()
{
    return (
        <>
            <Grid item xs = {12}>
            <Typography>Control de Stock</Typography>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {NAMES.map((name) => 
                    (<Grid item xs={6} key={name}>
                        <HomeCard title={name}/>
                    </Grid>)                
                ) }
            </Grid>
        </>
    );
}
