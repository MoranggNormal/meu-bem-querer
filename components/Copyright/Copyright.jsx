/*
- Hooks
*/
import Link from "next/link";

/*
- Components
*/
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
 return (
  <Typography
   variant="body2"
   color="text.secondary"
   align="center"
   {...props}
  >
   {"Copyright © "}
   <Link color="inherit" href="https://mui.com/">
        Meu bem-querer
   </Link>{" "}
   {new Date().getFullYear()}
   {"."}
  </Typography>
 );
}
