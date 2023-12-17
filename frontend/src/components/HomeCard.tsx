import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

interface Props {
    title: string
  }
export default function HomeCard(props: Props){
    return(
        <Box width={"40%"} height={{xs:"2rem",sm:"2rem"}} textAlign={"center"} border={"1px solid black"}>
        <Typography>{props.title}</Typography>
        </Box>
    )
}