import { Button, Link } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";

export const ButtonLink: React.FC<{
  link: Maybe<string> | undefined;
  text: string;
}> = ({ link, text }) => {
  return (
    <>
      <Button
        as={Link}
        _hover={{ textDecor: "none", color: "mainOrange", bgColor: "white" }}
        fontFamily="Selawik Light"
        letterSpacing="1px"
        bgColor="mainOrange"
        width="fit-content"
        isExternal={true}
        textShadow="none"
        href={link}
        filter={link ? "" : "grayscale(100%)"}
        pointerEvents={link ? "auto" : "none"}
        margin={["0 4px 0 4px", null, "0 8px 0 8px"]}
        fontSize={["14px", null, "16px"]}
      >
        {link ? text : "Website not deployed"}
      </Button>
    </>
  );
};
