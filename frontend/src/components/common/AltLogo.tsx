import Logo from "./Logo";
import altLogo from "../../assets/logo-alt.png";

interface AltLogoProps {
  width?: string | number;
  height?: string | number;
  marginBottom?: string | number;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const AltLogo: React.FC<AltLogoProps> = ({
  width = 150,
  height,
  marginBottom = 20,
  alt = "Alt Logo",
  className = "",
  style = {},
}) => {
  return (
    <Logo
      width={width}
      height={height}
      marginBottom={marginBottom}
      src={altLogo}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export default AltLogo;
