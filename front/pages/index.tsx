import { Box, Stack, Text, Img, Link } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Biography } from "../components/landingPageComponents/biography";
import { Technologies } from "../components/landingPageComponents/Technologies";
import { ThreejsStarField } from "../utils/landingPage/ThreejsStarField";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";
import Image from "next/image";

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
          width={`clamp(${1108 * 0.4}px, 100vw, ${1108 * 0.9}px)`}
          height={`clamp(${603 * 0.4}px, 100vh, ${603 * 0.9}px)`}
          background="rgba(0,0,0,0.7)"
        >
          <Box
            position="relative"
            width="100%"
            height="100%"
            id="text-container"
            fontWeight="bold"
            display="grid"
            placeItems="center"
          >
            <Text
              left="4.14%"
              right="52.29%"
              top="5.76%"
              bottom="72.8%"
              pos="absolute"
              fontSize="64px"
              letterSpacing="0.115em"
              width="fit-content"
            >
              Khongchai
            </Text>
            <Text
              pos="absolute"
              left="49.24%"
              right="6.78%"
              top="22.19%"
              bottom="59.04%"
              fontSize="64px"
              letterSpacing="0.115em"
              width="fit-content"
            >
              Greesuradej
            </Text>
            <Text
              pos="absolute"
              left="4.14%"
              right="52.29%"
              top="65.84%"
              bottom="14.59%"
              fontSize="64px"
              letterSpacing="0.115em"
              w="fit-content"
            >
              Web <br /> Developer
            </Text>
            <Box
              position="relative"
              width={["250px", "300px", "430px", "500px"]}
              height={["250px", "300px", "430px", "500px"]}
              margin="auto auto"
              zIndex="-1"
            >
              <Img
                alt="author's picture"
                src="/graphics/khong.png"
                objectFit="contain"
              />
            </Box>
            <Link href="#biography">
              <Box
                pos="absolute"
                right="20px"
                transform="rotate(90deg)"
                bottom="50px"
                display="flex"
              >
                <Text fontSize="14px" marginRight="5px">
                  About me
                </Text>
                <Img
                  position="relative"
                  transform="rotate(-90deg) translateX(-10%)"
                  src="/graphics/arrow-pointing-down.png"
                  width="20px"
                />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
      <Biography />
      <Technologies />
    </Stack>
  );
}
