import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Logo from "../Logo/Logo";

import { useAuth } from "../../hooks/useAuth";

const Header = ({ loading }) => {
  const auth = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    auth.signout();
  };

  const handleLogin = () => {
    auth.signInWithGoogle();
  };

  const pages = [
    { route: "Início", href: "/" },
    { route: "Doar", href: "/addPet" },
    { route: "Doações", href: "/pets" },
    { route: "Como contribuir", href: "/pets" },
    { route: "Quem somos", href: "/pets" },
    { route: "Apoiar projeto", href: "/pets" },
  ];

  const settings = [
    auth.user
      ? { name: "Logout", action: () => handleLogout() }
      : {
          name: "Entrar em minha conta",
          action: () => handleLogin(),
        },
  ];

  return (
    <AppBar position="sticky" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Typography
            noWrap
            component="h1"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              fontSize: "1.2rem",
              flexGrow: 1,
            }}
          >
            <Logo width={80} height={80} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ route, href }) => (
                <MenuItem key={route}>
                  <Link href={href} onClick={handleCloseNavMenu}>
                    <a
                      style={{
                        color: "#EC407A",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {route}
                    </a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map(({ route, href }) => (
              <MenuItem key={route}>
                <Link href={href} onClick={handleCloseNavMenu}>
                  <a
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {route}
                  </a>
                </Link>
              </MenuItem>
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

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    alt={auth.user ? auth.user.displayName : "convidado"}
                    src={auth.user ? auth.user.photoURL : ""}
                  />
                )}
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                {auth.user ? (
                  <Button onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: "0.3em" }} />
                    Sair da minha conta
                  </Button>
                ) : (
                  <Button onClick={handleLogin}>
                    <LoginIcon sx={{ marginRight: "0.3em" }} />
                    Entrar em minha conta
                  </Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
