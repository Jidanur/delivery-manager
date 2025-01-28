import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ sections, selectedSection, onNavigate, logoutPath }) => {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 1,
      }}
    >
      <Box>
        {/* Sidebar Header */}
        <Box
          sx={{
            padding: 2,
            backgroundColor: "primary.main",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">Manager Dashboard</Typography>
        </Box>

        {/* Sidebar Navigation */}
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

      {/* Logout Button */}
      <Box sx={{ padding: 2 }}>
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
    </Box>
  );
};

export default Sidebar;
