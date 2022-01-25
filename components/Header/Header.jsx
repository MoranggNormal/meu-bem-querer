/*
- Hooks
*/
import { useAuth } from "../../hooks/useAuth";
import Link from "next/link";
import useScrollTrigger from "@mui/material/useScrollTrigger";

/*
- Components
*/
import Logo from "../Logo/Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import MobileMenu from "../MobileMenu/MobileMenu";
import AccountMenu from "../AccountMenu/AccountMenu";

/*
- Routes
*/
const pages = [
 { route: "Início", href: "/" },
 { route: "Fazer uma doação", href: "/addPet" },
 { route: "Adotar um pet", href: "/pets" },
 { route: "Como doar", href: "/pets" },
];

const Header = (props) => {
 const auth = useAuth();

 const HideOnScroll = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
   target: window ? window() : undefined,
  });

  return (
   <Slide appear={false} direction="down" in={!trigger}>
    {children}
   </Slide>
  );
 };

 return (
  <>
   <HideOnScroll {...props}>
    <AppBar position="sticky" elevation={2}>
     <Container maxWidth="xl">
      <Toolbar sx={{ display: "flex" }}>
       <Box
        component="div"
        sx={{
         display: { xs: "none", md: "flex" },
         flexGrow: 1,
         alignItems: "center",
        }}
       >
        <Link href="/" passHref>
         <Box
          component="a"
          sx={{
           cursor: "pointer",
           display: "grid",
           placeItems: "center",
          }}
         >
          <Logo width={48} height={32} />
         </Box>
        </Link>
       </Box>

       <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <MobileMenu>
         <MenuIcon />
        </MobileMenu>
       </Box>

       <Box
        sx={{
         display: { xs: "none", md: "flex" },
         marginRight: "1.5em",
        }}
       >
        {pages.map(({ route, href }) => (
         <Link key={route} href={href} passHref>
          <MenuItem component="a">{route}</MenuItem>
         </Link>
        ))}
       </Box>

       <Box
        sx={{
         display: "flex",
         alignItems: "center",
         gap: "1em",
        }}
       >
        <Typography
         noWrap
         component="h1"
         sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
         }}
        >
         {auth.user ? auth.user.displayName : "Convidado"}
        </Typography>

        <AccountMenu />
       </Box>
      </Toolbar>
     </Container>
    </AppBar>
   </HideOnScroll>
  </>
 );
};
export default Header;
