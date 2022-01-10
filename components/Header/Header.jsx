import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import Link from "next/link";

import Logo from "../Logo/Logo";

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
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

const pages = [
  { route: "Doar", href: "/addPet" },
  { route: "Doações", href: "/pets" },
  { route: "Como contribuir", href: "/pets" },
  { route: "Quem somos", href: "/pets" },
  { route: "Apoiar projeto", href: "/pets" },
];

const Header = ({ loading }) => {
  const auth = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
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

  return (
    <AppBar position="sticky" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
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
            <IconButton
              size="large"
              aria-label="Menu"
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
                <Link key={route} href={href} onClick={handleCloseNavMenu}>
                  <a
                    style={{
                      color: "#EC407A",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    <MenuItem>{route}</MenuItem>
                  </a>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, marginRight: "1.5em" }}
          >
            {pages.map(({ route, href }) => (
              <Link key={route} href={href} onClick={handleCloseNavMenu}>
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
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Badge badgeContent={1} color="error">
                    <Avatar
                      alt={auth.user ? auth.user.displayName : "convidado"}
                      src={auth.user ? auth.user.photoURL : ""}
                    />
                  </Badge>
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
