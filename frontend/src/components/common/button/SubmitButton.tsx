import { ButtonProps } from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import StyledButton from "./StyledButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// Define keyframes for animations
const extend = keyframes`
  0% { width: 100%; height: 50px; border-radius: 50px; }
  10% { width: 95%; height: 55px; }
  20% { width: 90%; height: 50px; }
  100% { width: 50px; height: 50px; border-radius: 50%; }
`;

const disappear = keyframes`
  0% { opacity: 1; }
  20% { color: #3A4856; }
  100% { opacity: 0; }
`;

const appear = keyframes`
  0% { opacity: 0; }
  70% { opacity: 0; }
  100% { opacity: 1; }
`;

const AnimatedButton = styled(StyledButton)<ButtonProps>({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&.animate": {
    animation: `${extend} 1s ease-in-out forwards`,
  },
  "& .text": {
    transition: "opacity 0.3s",
  },
  "&.animate .text": {
    animation: `${disappear} 1s ease-in-out forwards`,
  },
  "& .icon": {
    position: "absolute",
    opacity: 0,
    width: "30px",
    height: "30px",
  },
  "&.animate .icon": {
    animation: `${appear} 1s ease-in-out forwards`,
  },
});

const SubmitButton: React.FC<ButtonProps> = (props) => {
  const [animate, setAnimate] = useState(false);

  return (
    <AnimatedButton
      className={animate ? "animate" : ""}
      fullWidth
      variant="contained"
      onClick={() => setAnimate(true)}
      {...props}
    >
      <span className="text">Submit</span>
      <CheckCircleOutlineOutlinedIcon
        className="icon"
        fontSize="large"
        style={{ color: "#3A4856" }}
      />
    </AnimatedButton>
  );
};

export default SubmitButton;
