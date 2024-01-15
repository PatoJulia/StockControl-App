import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}
export default function HomeCard(props: Props) {
  return (
    <Box
      margin={"auto"}
      width={"40%"}
      textAlign={"center"}
      border={"1px solid black"}
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={"1.4rem"}>{props.title}</Typography>
    </Box>
  );
}
