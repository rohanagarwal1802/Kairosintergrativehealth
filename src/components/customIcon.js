import React from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const IconContainer = styled("div")(({ size, colorFilter }) => ({
  width: size || "40px",
  height: size || "40px",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: colorFilter || "none",
  WebkitFilter: colorFilter || "none",
}));

const CustomIcon = ({ src, alt, color, size, path, onClick, ...props }) => {
  const router = useRouter();

  const isIconPage = color === "black";
  const colorFilter = isIconPage ? "invert(1) brightness(1)" : "none";

  const handleClick = (e) => {
    if (path) {
      router.push(path);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <IconContainer
      size={size}
      style={{ backgroundImage: `url(${src})`, cursor: "pointer" }}
      aria-label={alt}
      colorFilter={colorFilter}
      {...props}
      onClick={handleClick}
    />
  );
};

export default CustomIcon;
