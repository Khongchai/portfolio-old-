import { Img } from "@chakra-ui/react";
import React from "react";

export const KhongImage: React.FC<{ width?: string; height?: string }> = ({
  width,
  height,
}) => {
  return (
    <Img
      alt="author's picture"
      src="/graphics/khong.png"
      objectFit="contain"
      width={width ? width : "unset"}
      heigth={height ? height : "unset"}
    />
  );
};
