import { Button, Link } from "@chakra-ui/react";
import React from "react";

export const ButtonLinkII: React.FC<{ text: string; href: string }> = ({
  text,
  href,
}) => {
  return (
    <Button
      textDecoration="none !important"
      color="black"
      background="mainOrange"
      padding="0.75rem 1.50rem 0.75rem 1.50rem"
      borderRadius="3px"
      as={Link}
      _hover={{ background: "white", color: "mainOrange" }}
      href={href}
    >
      {text}
    </Button>
  );
};
