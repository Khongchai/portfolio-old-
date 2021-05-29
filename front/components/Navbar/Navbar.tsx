import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { ExtraElemContext } from "../../globalContexts/extraNavbarElem";
import {
  navbarTopics,
  TopicsContext,
} from "../../globalContexts/navbarTopics.js";
import { page } from "../../types/page";
import { filterPages } from "../../utils/navbar/filterpages";

export const Navbar: React.FC<{}> = () => {
  const defaultNavbarTopics: typeof navbarTopics = useContext(TopicsContext);
  const pages = filterPages(defaultNavbarTopics);
  const pagesWithDropDowns = Object.values(pages.pagesGroup).map(
    (page) => page
  );
  const ExtraNavbarElems: any = useContext(ExtraElemContext);
  const router = useRouter();
  return (
    <Flex
      id="navbar"
      position="absolute"
      top="0"
      p={["2.3em 3em 1.3em 3em", null, "1.3em 3em 1.3em 3em"]}
      width={["100%"]}
    >
      {pagesWithDropDowns.map((pageWithDropDown, i) => (
        <>
          <Menu key={i}>
            <MenuButton
              fontWeight="normal"
              p="0 6em 0 1em"
              borderRight="solid white 1px"
              width="fit-content"
              display={["none", null, null, "block"]}
              _hover={{ cursor: "pointer", color: "mainOrange" }}
            >
              {pageWithDropDown[0].pageName.split(":")[0]}
            </MenuButton>
            <MenuList
              bgColor="mainGrey"
              onClick={(e: any) => {
                router.push(e.target.value);
              }}
            >
              {pageWithDropDown.map((subPage) => (
                <LinkButton
                  key={subPage.pageName}
                  page={subPage}
                  isDropdown={true}
                />
              ))}
            </MenuList>
          </Menu>
        </>
      ))}

      {pages.pagesWithNoDropdowns.map((page) => (
        <LinkButton key={page.pageName} page={page} />
      ))}

      <NextLink href="/tech/admin/">
        <Flex mr="auto" placeItems="center">
          <Button>Admin Login</Button>
        </Flex>
      </NextLink>
      {ExtraNavbarElems?.desktop ? ExtraNavbarElems.desktop : null}
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
  if (!isDropdown) {
    return (
      <NextLink href={url}>
        <Flex placeItems="center">
          <Text
            display={["none", null, null, "block"]}
            className="nav-buttons"
            fontFamily="Selawik"
            borderBottom="1px solid transparent"
            _hover={{ cursor: "pointer", color: "mainOrange" }}
            p="1em"
            mr="5em"
          >
            {pageName}
          </Text>
        </Flex>
      </NextLink>
    );
  }

  return (
    <MenuItem
      color="white"
      className="nav-buttons"
      value={url}
      fontFamily="Selawik"
    >
      {pageName.split(":")[1]}
    </MenuItem>
  );
};

//////////////////////////Mobile///////////////////////////////////////////////////////////

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
      display={["flex", null, null, "none"]}
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
          <DrawerHeader color="white" borderBottomWidth="1px">
            Go to
          </DrawerHeader>
          <DrawerBody
            pt="2em"
            css={{ "> *": { marginBottom: "2em" } }}
            color="white"
          >
            {pagesWithDropDowns.map((pageWithDropDown, i) => (
              <Menu isLazy key={i}>
                <MenuButton
                  fontWeight="bold"
                  fontFamily="Selawik light"
                  width="fit-content"
                  display={["block", null, null, "none"]}
                >
                  {pageWithDropDown[0].pageName.split(":")[0]}
                </MenuButton>
                <MenuList
                  className="menu-list-mobile"
                  p="2px 0 0 auto"
                  bgColor="mainGrey"
                  onClick={(e: any) => {
                    router.push(e.target.value);
                  }}
                >
                  {pageWithDropDown.map((subPage) => (
                    <LinkButtonMobile
                      key={subPage.pageName}
                      page={subPage}
                      isDropdown={true}
                    />
                  ))}
                </MenuList>
              </Menu>
            ))}

            {pages.pagesWithNoDropdowns.map((page) => (
              <LinkButtonMobile key={page.pageName} page={page} />
            ))}
            <Box borderTop="1px solid" color="mainGrey" mt={10} />
            {ExtraNavbarElems?.mobile ? ExtraNavbarElems.mobile : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

//Handles dropdowns a little differently
const LinkButtonMobile: React.FC<{ page: page; isDropdown?: boolean }> = ({
  page,
  isDropdown,
}) => {
  const { pageName, url } = page;
  if (!isDropdown) {
    return (
      <NextLink href={url}>
        <Flex placeItems="center">
          <Text
            display={["block", null, "none"]}
            className="nav-buttons"
            fontFamily="Selawik"
          >
            {pageName}
          </Text>
        </Flex>
      </NextLink>
    );
  }

  return (
    <MenuItem
      color="white"
      className="nav-buttons"
      value={url}
      fontFamily="Selawik"
    >
      {pageName.split(":")[1]}
    </MenuItem>
  );
};
