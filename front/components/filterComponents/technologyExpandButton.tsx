import { Box, Button, Img } from "@chakra-ui/react";
import React, { useState } from "react";

//onclick, the arrow flips to pointing down
const ExpandButton: React.FC<{}> = ({}) => {
  const [direction, setDirection] = useState("up");
  return (
    <Box
      marginTop="auto !important"
      w="100%"
      onClick={() => setDirection(direction === "up" ? "down" : "up")}
    >
      <Box
        bgColor="grey2"
        w="fit-content"
        pos="relative"
        borderRadius="50%"
        margin="0 auto"
        transform="translateY( 50%)"
      >
        <Img
          cursor="pointer"
          src="/graphics/arrow.png"
          pos="relative"
          transition=".3s"
          transform={
            direction === "up"
              ? "translateY(-16%)"
              : "translateY(-16%) rotate(180deg)"
          }
          zIndex="4"
        />
      </Box>
      <Box
        w="100%"
        bgColor="grey2"
        color="mainOrange"
        mb="1rem"
        cursor="pointer"
        p="0.5rem"
        borderRadius="10px"
        textAlign="center"
        fontWeight="bold"
      >
        Technologies used in this project
      </Box>
    </Box>
  );
};

export default ExpandButton;
