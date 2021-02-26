import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Img,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export const Navbar: React.FC<{}> = ({}) => {
  return (
    <Flex
      id="navbar"
      position="absolute"
      top="0"
      p={["2.3em 3em 1.3em 3em", null, "1.3em 3em 1.3em 3em"]}
      width={["100%", null, "50%"]}
    >
      <LinkButton url="/tech" pageName="Home" />
      <LinkButton url="/tech/filter" pageName="Filter" />
      <LinkButton url="/tech/about" pageName="About" />
      <HamburgerMenu />
    </Flex>
  );
};

const LinkButton: React.FC<{ pageName: string; url: string }> = ({
  pageName,
  url,
}) => {
  //change from onclick to parse values from URL instead
  function setButtonAsActive(clickedButton: HTMLElement) {
    const navButtons = document.getElementsByClassName(
      "nav-buttons"
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < navButtons.length; i++) {
      if (navButtons[i] !== clickedButton) {
        navButtons[i].style.borderBottom = "";
      } else {
        navButtons[i].style.borderBottom = "1px solid white";
      }
    }
  }
  return (
    <NextLink href={url}>
      <Text
        display={["none", null, "block"]}
        className="nav-buttons"
        fontFamily="Selawik Light"
        _hover={{ cursor: "pointer", borderBottom: "1px solid white" }}
        p="1em"
        mr="5em"
        onClick={(e) => setButtonAsActive(e.target as HTMLElement)}
      >
        {pageName}
      </Text>
    </NextLink>
  );
};

const HamburgerMenu: React.FC<{}> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      zIndex="100"
      display={["flex", null, "none"]}
      width="100%"
      position="relative"
      onClick={onOpen}
    >
      <Img
        ml={"auto"}
        filter="invert(100%)"
        href="/music"
        width="2em"
        src="/graphics/hamburger.svg"
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color="mainGrey" borderBottomWidth="1px">
            Go to
          </DrawerHeader>
          <DrawerBody css={{ "> *": { marginTop: "1em" } }} color="mainGrey">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
