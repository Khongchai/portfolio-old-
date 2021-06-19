import { Box, Stack, Img } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Biography } from "../components/landingPageComponents/biography";
import { Technologies } from "../components/landingPageComponents/Technologies";
import { ThreejsStarField } from "../utils/landingPage/ThreejsStarField";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";
import { KhongBanner } from "../components/landingPageComponents/KhongBanner";

export default function HomePage() {
  const [navbarHeight, setNavbarheight] = useState("");
  const threejsCanvas = useRef(null);
  useEffect(() => {
    setNavbarheight(getNavbarHeight());
    const starfieldCanvas = document.querySelector("canvas.webgl-starfield") as
      | HTMLCanvasElement
      | undefined;

    let starfield: ThreejsStarField | undefined;
    if (starfieldCanvas && typeof window !== "undefined" && window) {
      starfield = new ThreejsStarField(starfieldCanvas);
      starfield.action();
      // banner = new ThreejsBanner(bannerCanvas, bannerCanvas.parentElement!);
      // banner.action();
    }

    return () => {
      if (starfield) {
        starfield.removeEventListeners();
        // banner.removeEventListeners();
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
        gridColumn={[
          "main-content-start / main-content-end",
          null,
          null,
          "left-screen / right-screen",
        ]}
        position="relative"
        ref={threejsCanvas}
      >
        <canvas
          className="webgl-starfield"
          style={{ width: "100%", height: "100%" }}
        />

        <KhongBanner />
      </Box>
      <Biography />
      <Technologies />
    </Stack>
  );
}
