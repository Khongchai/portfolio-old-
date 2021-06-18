import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Biography } from "../components/landingPageComponents/biography";
import { Technologies } from "../components/landingPageComponents/Technologies";
import { ThreejsBanner } from "../utils/landingPage/Banner/ThreejsBanner";
import { ThreejsStarField } from "../utils/landingPage/ThreejsStarField";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";

export default function HomePage() {
  const [navbarHeight, setNavbarheight] = useState("");
  const threejsCanvas = useRef(null);
  useEffect(() => {
    setNavbarheight(getNavbarHeight());
    const starfieldCanvas = document.querySelector("canvas.webgl-starfield") as
      | HTMLCanvasElement
      | undefined;
    const bannerCanvas = document.querySelector("canvas.webgl-banner") as
      | HTMLCanvasElement
      | undefined;
    let starfield: ThreejsStarField | undefined;
    let banner: ThreejsBanner | undefined;
    if (
      starfieldCanvas &&
      bannerCanvas &&
      typeof window !== "undefined" &&
      window
    ) {
      starfield = new ThreejsStarField(starfieldCanvas);
      starfield.action();
      banner = new ThreejsBanner(bannerCanvas, bannerCanvas.parentElement!);
      banner.action();
    }

    return () => {
      if (starfield && banner) {
        starfield.removeEventListeners();
        banner.removeEventListeners();
      }
    };
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
        h={`calc(100vh - ${navbarHeight})`}
        gridRow="1"
        gridColumn="left-screen / right-screen"
        position="relative"
        ref={threejsCanvas}
      >
        <canvas
          className="webgl-starfield"
          style={{ width: "100%", height: "100%" }}
        />
        <Box
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          pos="absolute"
          width={`${1108 * 0.9}px`}
          height={`${603 * 0.9}px`}
        >
          <canvas
            className="webgl-banner"
            //add border to debug
            // style={{ width: "100%", height: "100%", border: "1px solid blue" }}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <Biography />
      <Technologies />
    </Stack>
  );
}
