import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

export const Navbar: React.FC<{}> = ({}) => {
  return (
    <Flex
      id="navbar"
      position="absolute"
      top="0"
      p="1.3em 3em 1.3em 3em"
      width="50%"
    >
      <LinkButton url="/tech" pageName="Home" />
      <LinkButton url="/tech/filter" pageName="Filter" />
      <LinkButton url="/tech/about" pageName="About" />
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
