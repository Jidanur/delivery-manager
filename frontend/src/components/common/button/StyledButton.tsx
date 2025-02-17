import { Button, ButtonProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

type StyledButtonProps = ButtonProps & {
  to?: LinkProps["to"];
};

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  to,
  ...props
}) => {
  return (
    <Button
      component={to ? Link : "button"}
      to={to}
      variant="contained"
      fullWidth
      sx={{
        mt: 3,
        mb: 2,
        backgroundColor: "#A2D2FF", // Primary color
        color: "#3A4856", // High contrast text
        borderRadius: "50px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#89C2FF", // Slightly lighter shade for hover
          transform: "scale(1.05)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
