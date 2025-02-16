import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface SidebarProps {
  sections: string[];
  selectedSection: string;
  onNavigate: (section: string) => void;
  logoutPath: string;
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  selectedSection,
  onNavigate,
  logoutPath,
  children,
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* AppBar for the top section */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for the Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sections.map((section) => (
              <ListItemButton
                key={section}
                selected={selectedSection === section}
                onClick={() => onNavigate(section)}
              >
                <ListItemText primary={section} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Box sx={{ marginTop: "auto", padding: 2 }}>
          {children}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to={logoutPath}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
