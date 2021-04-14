import { Box } from "@chakra-ui/react";
import React from "react";

interface TinyImgProps {}

export const TinyImg: React.FC<TinyImgProps> = ({}) => {
  return (
    <Box
      w="200px"
      flex="0.8"
      margin={2}
      bgColor="mainGrey"
      borderRadius="22px"
    />
  );
};
