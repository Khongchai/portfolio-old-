import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import React from "react";
import { ButtonLinkII } from "../../../elements/ButtonLinkII";
import { LeftCorner, RightCorner } from "./Corners";
import { KhongImage } from "./KhongImage";

interface KhongBannerMobileProps {}

export const KhongBannerMobile: React.FC<KhongBannerMobileProps> = ({}) => {
  return (
    <Flex
      top="50%"
      left="50%"
      transform="translate(-50%, -47%)"
      pos="absolute"
      width="100%"
      height="100%"
      background={["rgba(0,0,0,0.5)", null, null, "rgba(0,0,0,0.6)"]}
      padding="1rem"
      display={["flex", null, null, "none"]}
      flexDir="column"
      justify="center"
      align="center"
    >
      <Stack
        spacing={6}
        padding="2rem"
        display="flex"
        position="relative"
        align="center"
      >
        <Box
          m="0 !important"
          position="absolute"
          width="100%"
          height="100%"
          id="corners-absolute-container"
        >
          <LeftCorner />
          <RightCorner />
        </Box>

        <Heading as="h2" size="2xl" textAlign="center" fontSize="2.25rem">
          Khongchai Greesuradej
        </Heading>
        <Box>
          <KhongImage width="350px" height="350px" />
        </Box>
        <Heading as="h4" size="lg">
          Web Developer
        </Heading>
        <ButtonLinkII text={"About Me"} href="#biography" />
        <ButtonLinkII text={"Projects"} href="#projects" />
      </Stack>
    </Flex>
  );
};
