import { Box, Img, Link, Text } from "@chakra-ui/react";
import React from "react";

export const KhongBanner: React.FC = () => {
  return (
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
        <Box
          position="relative"
          width={["180px", null, null, "480px"]}
          height={["180px", null, null, "480px"]}
          margin="auto auto"
          transition=".3s"
          zIndex="-1"
        >
          <Img
            alt="author's picture"
            src="/graphics/khong.png"
            objectFit="contain"
          />
        </Box>
        <Box
          display={["none", null, null, "unset"]}
          pos="absolute"
          bottom="-24px"
          left="-24px"
        >
          <Img src="/graphics/corner.png" />
        </Box>
        <Box
          pos="absolute"
          top="-24px"
          right="-24px"
          transform="rotate(180deg)"
          display={["none", null, null, "unset"]}
        >
          <Img src="/graphics/corner.png" />
        </Box>
        <Text
          left={["25.14%", null, null, "4.14%"]}
          top={["53.76%", null, null, "5.76%"]}
          pos="absolute"
          fontSize={["24px", null, "38px", "64px"]}
          letterSpacing="0.115em"
          transition=".3s"
          width="fit-content"
        >
          Khongchai
        </Text>
        <Text
          pos="absolute"
          left={["44.14%", null, null, "49.24%"]}
          top={["61.19%", null, "65%", "22.19%"]}
          fontSize={["24px", null, "38px", "64px"]}
          letterSpacing="0.115em"
          width="fit-content"
          transition=".3s"
        >
          Greesuradej
        </Text>
        <Text
          pos="absolute"
          left={["12.14%", null, null, "4.14%"]}
          top={["79%", null, null, "65.84%"]}
          fontSize={["24px", "38px", null, "64px"]}
          transition=".3s"
          letterSpacing="0.115em"
          w="fit-content"
        >
          Web <br /> Developer
        </Text>

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
  );
};
