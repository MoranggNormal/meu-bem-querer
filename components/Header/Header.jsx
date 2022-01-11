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
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import Slide from "@mui/material/Slide";
import MobileMenu from "../MobileMenu/MobileMenu";

/*
- Routes
*/
const pages = [
  { route: "Doar", href: "/addPet" },
  { route: "Doações", href: "/pets" },
  { route: "Como contribuir", href: "/pets" },
  { route: "Quem somos", href: "/pets" },
  { route: "Apoiar projeto", href: "/pets" },
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
                <Link href="/">
                  <a>
                    <Logo width={80} height={80} />
                  </a>
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
                  <Link key={route} href={href}>
                    <a
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      <MenuItem>{route}</MenuItem>
                    </a>
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

                <Tooltip title="Abrir menu">
                  <Badge badgeContent={21} color="error">
                    <Avatar
                      alt={auth.user ? auth.user.displayName : "convidado"}
                      src={auth.user ? auth.user.photoURL : ""}
                    />
                  </Badge>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
};
export default Header;
