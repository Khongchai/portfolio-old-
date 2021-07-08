import { Box, Img } from "@chakra-ui/react";
import React from "react";

type Corners = { offset?: string };
export const LeftCorner: React.FC<Corners> = ({ offset }) => {
  return (
    <Box
      pos="absolute"
      bottom={offset ? offset : 0}
      left={offset ? offset : 0}
      id="left-corner-indicator"
    >
      <Img src="/graphics/corner.png" />
    </Box>
  );
};
export const RightCorner: React.FC<Corners> = ({ offset }) => {
  return (
    <Box
      pos="absolute"
      top={offset ? offset : 0}
      right={offset ? offset : 0}
      transform="rotate(180deg)"
      id="right-corner-indicator"
    >
      <Img src="/graphics/corner.png" />
    </Box>
  );
};
