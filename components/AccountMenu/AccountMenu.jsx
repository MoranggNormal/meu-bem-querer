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

/*
- Routes Data
*/
import { firstRoutes, secondRoutes } from "./Routes";

export default function MobileMenu() {
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

  return (
    <>
      <Avatar
        alt={auth.user ? auth.user.displayName : "convidado"}
        src={auth.user ? auth.user.photoURL : ""}
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
