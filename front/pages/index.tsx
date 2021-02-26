import { Box, Flex, Img } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export default function Home() {
  return (
    <Flex
      flexDir={["column", null, "row"]}
      w={"100%"}
      h={["auto", null, "100vh"]}
    >
      <ImgContainer href="/music" bgColor="mainGrey" src="/logos/FL.png" />
      <ImgContainer href="/tech" bgColor="white" src="/logos/VS.png" />
    </Flex>
  );
}

const ImgContainer: React.FC<{
  bgColor: string;
  src: string;
  href: string;
}> = ({ bgColor, src, href }) => {
  return (
    <Box
      bgColor={bgColor}
      boxSizing={"border-box"}
      p={["1em 0 1em 0", null, "0"]}
      flex="1"
      d="grid"
      placeItems="center"
    >
      <NextLink href={href}>
        <Img
          _hover={{ cursor: "pointer" }}
          h={["70%", null, "auto"]}
          src={src}
        />
      </NextLink>
    </Box>
  );
};
