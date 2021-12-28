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
    <AppBar position="sticky" sx={{ py: 2 }} elevation={2}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            noWrap
            component="h1"
            sx={{
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            MEU BEM-QUERER
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
                    <a style={{ color: "#fff ", textDecoration: "none" }}>
                      {route}
                    </a>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            MEU BEM-QUERER
          </Typography>

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
              alignItems: "flex-end",
              gap: "1em",
            }}
          >
            {loading ? (
              <Skeleton animation="wave" height={13} width={80} />
            ) : (
              <Typography
                textAlign="center"
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                <Tooltip
                  title={auth.user ? "Sair da conta" : "Entrar em minha conta"}
                >
                  <IconButton>
                    {auth.user ? (
                      <LogoutIcon
                        sx={{ color: "#fff" }}
                        onClick={handleLogout}
                      />
                    ) : (
                      <LoginIcon sx={{ color: "#fff" }} onClick={handleLogin} />
                    )}
                  </IconButton>
                </Tooltip>
              </Typography>
            )}

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
              {settings.map(({ name, action }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" onClick={action}>
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
