import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Img,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import NextLink from "next/link";
import {
  TopicsContext,
  navbarTopics,
} from "../../globalContexts/navbarTopics.js";
import { ExtraElemContext } from "../../globalContexts/extraNavbarElem";
import { useRouter } from "next/router";
import { filterPages } from "../../utils/navbar/filterpages";
import { page } from "../../types/page";

export const Navbar: React.FC<{}> = () => {
  const defaultNavbarTopics: typeof navbarTopics = useContext(TopicsContext);
  const pages = filterPages(defaultNavbarTopics);
  const pagesWithDropDowns = Object.values(pages.pagesGroup).map(
    (page) => page
  );
  const router = useRouter();
  return (
    <Flex
      id="navbar"
      position="absolute"
      top="0"
      p={["2.3em 3em 1.3em 3em", null, "1.3em 3em 1.3em 3em"]}
      width={["100%", null, "50%"]}
    >
      {pagesWithDropDowns.map((pageWithDropDown) => (
        <Select
          appearance="none"
          display={["none", null, "block"]}
          fontFamily="Selawik Light"
          p="1em"
          width="fit-content"
          variant="flushed"
          onChange={(e) => {
            router.push(e.target.value);
          }}
        >
          {pageWithDropDown.map((page) => (
            <LinkButton key={page.pageName} page={page} isDropdown={true} />
          ))}
        </Select>
      ))}

      {pages.pagesWithNoDropdowns.map((page) => (
        <LinkButton key={page.pageName} page={page} />
      ))}
      <HamburgerMenu />
    </Flex>
  );
};

//Handles dropdowns a little differently
const LinkButton: React.FC<{ page: page; isDropdown?: boolean }> = ({
  page,
  isDropdown,
}) => {
  const { pageName, url } = page;
  //TODO change from onclick to parse values from URL instead?
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
  if (!isDropdown) {
    return (
      <NextLink href={url}>
        <Flex placeItems="center">
          <Text
            display={["none", null, "block"]}
            className="nav-buttons"
            fontFamily="Selawik Light"
            borderBottom="1px solid transparent"
            _hover={{ cursor: "pointer", borderBottom: "1px solid white" }}
            p="1em"
            mr="5em"
            onClick={(e) => setButtonAsActive(e.target as HTMLElement)}
          >
            {pageName}
          </Text>
        </Flex>
      </NextLink>
    );
  }

  return (
    <option style={{ color: "black" }} className="nav-buttons" value={url}>
      {pageName}
    </option>
  );
};

const HamburgerMenu: React.FC<{}> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ExtraNavbarElems: any = useContext(ExtraElemContext);
  const defaultNavbarTopics: typeof navbarTopics = useContext(TopicsContext);
  const pages = filterPages(defaultNavbarTopics);
  const pagesWithDropDowns = Object.values(pages.pagesGroup).map(
    (page) => page
  );
  const router = useRouter();
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
          <DrawerBody
            css={{ "> *": { marginTop: "1em", padding: "1em" } }}
            color="mainGrey"
          >
            {pagesWithDropDowns.map((pageWithDropDown) => (
              <Select
                fontFamily="Selawik Light"
                p="1em"
                width="fit-content"
                variant="flushed"
                onChange={(e) => {
                  router.push(e.target.value);
                }}
              >
                {pageWithDropDown.map((page) => (
                  <LinkButtonMobile
                    key={page.pageName}
                    page={page}
                    isDropdown={true}
                  />
                ))}
              </Select>
            ))}

            {pages.pagesWithNoDropdowns.map((page) => (
              <LinkButtonMobile key={page.pageName} page={page} />
            ))}
            <Box borderTop="1px solid" color="mainGrey" mt={10} />
            {ExtraNavbarElems ? ExtraNavbarElems : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

const LinkButtonMobile: React.FC<{ page: page; isDropdown?: true }> = ({
  page,
  isDropdown,
}) => {
  const { pageName, url } = page;
  if (!isDropdown) {
    return (
      <NextLink href={url}>
        <Text fontFamily="Selawik Light" cursor="pointer">
          {pageName}
        </Text>
      </NextLink>
    );
  }
  return (
    <option style={{ color: "black" }} className="nav-buttons" value={url}>
      {pageName}
    </option>
  );
};
