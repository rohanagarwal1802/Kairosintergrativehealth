import React from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

const IconContainer = styled("div")(({ size, colorFilter }) => ({
  width: size || "40px", // Default width
  height: size || "40px", // Default height
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: colorFilter || "none",
  WebkitFilter: colorFilter || "none",
}));

const CustomIcon = ({ src, alt, color, size,path, ...props }) => {
  const isIconPage = color === "black";
  const colorFilter = isIconPage
    ? "invert(1) brightness(1)" // Change icon color to white
    : "none";
    const router=useRouter()

  return (
    <IconContainer
      size={size}
      style={{ backgroundImage: `url(${src})`,cursor:"pointer" }}
      aria-label={alt}
      colorFilter={colorFilter}
      {...props}
      onClick={()=>router.push(path || '/')}
    />
  );
};

export default CustomIcon;
