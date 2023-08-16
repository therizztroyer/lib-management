import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerList = [
    {text: "Dashboard", path: "admin/dashboard"},
    {text : "View Requests", path: "admin/requestSection"},
    {text : "View/Edit/Delete Books", path: "admin/bookSection"},
    {text : "View all Users", path: "admin/userSection"},
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleListItemClick = (path) => {
    navigate(`../${path}`,{replace:true});
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {drawerList.map((data, index) => (
          <>
            <ListItem key={data.text} onClick={() => handleListItemClick(data.path)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={data.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginTop: "100px"}}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            zIndex: 1250,
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.children}
      </Box>

    </Box>
  );
}

export default ResponsiveDrawer;
