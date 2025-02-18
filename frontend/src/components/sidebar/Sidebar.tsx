import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { ReactNode } from "react";
import AltLogo from "../common/logo/AltLogo";
import LogoutButton from "../common/button/LogoutButton";
import UserAvatar from "../common/avatar/UserAvatar";

interface SidebarProps {
  sections: string[];
  selectedSection: string;
  onNavigate: (section: string) => void;
  heading: string;
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  sections,
  selectedSection,
  onNavigate,
  heading,
  children,
}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* AppBar for the top section */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#A2D2FF",
          color: "#3A4856",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {heading}
          </Typography>
          <UserAvatar />
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
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <AltLogo width={150} />
          </Box>
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
        <Box
          sx={{
            marginTop: "auto",
            padding: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
          <LogoutButton />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
