/*
- Hooks
*/
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

/*
- Components
*/
import Box from "@mui/material/Box";
import Link from "next/link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

/*
- Routes Data
*/
import { firstRoutes, secondRoutes } from "./Routes";

export default function MobileMenu({ name, picture }) {
  const auth = useAuth();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleAccount = () => {
    if (auth.user) {
      return auth.signout();
    }

    return auth.signInWithGoogle();
  };

  return (
    <>
      <Avatar
        alt={name ?? "Convidado"}
        src={picture ?? ""}
        onClick={toggleDrawer("left", true)}
        sx={[
          {
            "&:hover": {
              cursor: "pointer",
            },
          },
        ]}
      />

      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
        >
          <List>
            {firstRoutes.map(({ route, href, icon }) => (
              <Link key={route} href={href}>
                <ListItem component="a" sx={{ color: "primary.main" }} button>
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={route} />
                </ListItem>
              </Link>
            ))}

            <ListItem
              component="button"
              sx={{ color: "primary.main" }}
              button
              onClick={handleAccount}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                {auth.user ? <LogoutIcon /> : <LoginIcon />}
              </ListItemIcon>
              <ListItemText
                primary={auth.user ? "Sair da conta" : "Entrar da conta"}
              />
            </ListItem>
          </List>

          <Divider />

          <List>
            {secondRoutes.map(({ route, href, icon }) => (
              <Link key={route} href={href}>
                <ListItem component="a" sx={{ color: "primary.main" }} button>
                  <ListItemIcon sx={{ color: "primary.main" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={route} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
