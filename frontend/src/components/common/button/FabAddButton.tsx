import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FabAddButtonProps {
  title: string;
  onClick: () => void;
}

const FabAddButton: React.FC<FabAddButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <Fab
        sx={{
          backgroundColor: "#A2D2FF", // Primary color
          color: "#3A4856", // High contrast text
          "&:hover": {
            backgroundColor: "#89C2FF", // Slightly lighter shade for hover
          },
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        aria-label="add"
        onClick={onClick}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default FabAddButton;
