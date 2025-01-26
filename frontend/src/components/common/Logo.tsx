import logo from "../../assets/logo.png";

interface LogoProps {
  width?: string | number;
  height?: string | number;
  marginBottom?: string | number;
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({
  width = 150,
  height,
  marginBottom = 20,
  src = logo,
  alt = "Logo",
  className = "",
  style = {},
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: height
          ? typeof height === "number"
            ? `${height}px`
            : height
          : "auto",
        marginBottom:
          typeof marginBottom === "number" ? `${marginBottom}px` : marginBottom,
        ...style,
      }}
      className={className}
    />
  );
};

export default Logo;
