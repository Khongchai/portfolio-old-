import { Flex, Box, Img } from "@chakra-ui/react";
import React from "react";

interface infoProps {}

export const Info: React.FC<infoProps> = ({}) => {
  return (
    <Box className="info" flex="0.7">
      <Box>
        <Img float="left" id="image"></Img>
      </Box>
      <Box id="project-details"></Box>
    </Box>
  );
};
