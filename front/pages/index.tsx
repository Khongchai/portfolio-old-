import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Biography } from "../components/landingPageComponents/biography";
import { Technologies } from "../components/landingPageComponents/Technologies";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";

export default function HomePage() {
  const [navbarHeight, setNavbarheight] = useState("");
  useEffect(() => {
    setNavbarheight(getNavbarHeight());
  }, []);

  return (
    <Stack
      id="landing-page-container"
      d="grid"
      gridTemplateColumns={[
        "0.05fr [main-content-start] repeat(5, 0.5fr) [main-content-end] 0.05fr",
        null,
        null,
        "2fr [main-content-start] repeat(12, 0.5fr) [main-content-end] 2fr",
      ]}
      gridRow="auto"
      spacing="2rem"
      paddingBottom="5rem"
    >
      <Box
        id="about-khong-banner"
        gridRow="1"
        h={`calc(100vh - ${navbarHeight})`}
      ></Box>
      <Biography />
      <Technologies />
    </Stack>
  );
}
