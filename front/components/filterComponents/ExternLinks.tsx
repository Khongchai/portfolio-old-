import { Button, Flex, Img, Link, Stack } from "@chakra-ui/react";
import React from "react";

const Links: React.FC<{ webLink: string; githubLink: string }> = ({
  webLink,
  githubLink,
}) => {
  return (
    <Stack as={Flex} spacing="1.2rem" StackDir="column" align="center">
      {webLink ? (
        <Button
          as={Link}
          _hover={{ textDecor: "none", color: "mainOrange", bgColor: "white" }}
          fontFamily="Selawik Light"
          letterSpacing="1px"
          bgColor="mainOrange"
          width="fit-content"
          isExternal={true}
          href={webLink}
        >
          View website
        </Button>
      ) : (
        <Button variant="link" pointerEvents="none" color="white">
          This project is not deployed to the web
        </Button>
      )}

      <Link href={githubLink} isExternal={true}>
        <Img w="1.7rem" h="1.7rem" src="/logos/github.png" opacity="0.4" />
      </Link>
    </Stack>
  );
};

export default Links;
