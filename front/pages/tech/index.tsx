import { Box, Flex, Grid } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import setPadding from "../../utils/setFirstHeightToSecondPadding";

export default function Tech() {
  useEffect(() => {
    const timelinePage = document.getElementById("tech-timeline");
    const navbar = document.getElementById("navbar");
    if (timelinePage && navbar) {
      setPadding(navbar, timelinePage, 2);
    }
  }, []);

  return (
    <Box id="tech-timeline">
      <Grid
        width="100%"
        height="500px"
        bgColor="#444057"
        id="wallpaper-container"
        placeItems="center"
      >
        <Flex
          borderRadius="8px"
          bgColor="black"
          width="70%"
          height="80%"
          id="wallpaper"
        ></Flex>
      </Grid>
      <Box id="timeline-container">timeline container</Box>
    </Box>
  );
}
