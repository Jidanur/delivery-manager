import { Button, ButtonProps } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

type SubmitButtonProps = ButtonProps & {
  to?: LinkProps["to"];
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
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
        backgroundColor: "#4B5A6A", // Primary color
        color: "#FFFFFF", // High contrast text
        borderRadius: "50px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#3A4856", // Hover color
          transform: "scale(1.05)",
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
