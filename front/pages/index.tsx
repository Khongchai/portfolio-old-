import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Biography } from "../components/landingPageComponents/biography";
import { Technologies } from "../components/landingPageComponents/Technologies";
import { ThreeJSInstance } from "../utils/landingPage/initThreeJS";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";

export default function HomePage() {
  const [navbarHeight, setNavbarheight] = useState("");
  const threejsCanvas = useRef(null);
  useEffect(() => {
    setNavbarheight(getNavbarHeight());
    const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
    if (canvas && typeof window !== "undefined" && window) {
      const threejs = new ThreeJSInstance(canvas);
      threejs.main();
    }
  }, []);

  return (
    <Stack
      id="landing-page-container"
      d="grid"
      gridTemplateColumns={[
        "[left-screen] 0.05fr [main-content-start] repeat(5, 0.5fr) [main-content-end] 0.05fr [right-screen]",
        null,
        null,
        "[left-screen] 2fr [main-content-start] repeat(12, 0.5fr) [main-content-end] 2fr [right-screen]",
      ]}
      gridRow="auto"
      spacing="2rem"
      paddingBottom="5rem"
      overflow="hidden"
      z-index="-1"
      position="relative"
    >
      {/* Might need to turn off threejs for mobile so that users can scroll down */}
      <Box
        id="welcome-section"
        gridRow="1"
        h={`calc(100vh - ${navbarHeight})`}
        gridColumn="left-screen / right-screen"
        ref={threejsCanvas}
      >
        <canvas
          className="webgl"
          style={{ width: "100%", height: "100%" }}
        ></canvas>
        {/* <Box className="banner"></Box> */}
      </Box>
      <Biography />
      <Technologies />
    </Stack>
  );
}
