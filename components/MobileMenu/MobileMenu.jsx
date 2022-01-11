/*
- Hooks
*/
import { useState } from "react";

/*
- Components
*/
import Box from "@mui/material/Box";
import Link from "next/link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

/*
- Routes Data
*/
import { firstRoutes, secondRoutes } from "./Routes";

export default function MobileMenu() {
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
      <IconButton sx={{ color: "white" }} onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </IconButton>

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
