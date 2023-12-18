import HomeCard from "@/components/HomeCard";
import Box from "@mui/material/Box";
import  Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NAMES = ["Facturacion", "Productos", "Clientes"];

export default function HomeMenu()
{
    return (
        <>
            <Grid item xs = {12} textAlign={"center"}>
            <Typography>Control de Stock</Typography>
            </Grid>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {NAMES.map((name) => 
                    (<Grid item xs={6} key={name}>
                        <HomeCard title={name}/>
                    </Grid>)                
                ) }
            </Grid>
                <Box margin ={"auto"} width={"40%"} height={{xs:"2rem",sm:"2rem"}} textAlign={"center"} border={"1px solid black"} marginTop={2}>
                <Typography>Valor del Dolar</Typography>
                </Box>  

        </>
    );
}
