import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { ButtonLink } from "../../elements/ButtonLink";
import GithubLink from "../../elements/GithubLink";

const Links: React.FC<{
  webLink: string | null | undefined;
  githubLink: string;
  extraToggleButton?: {
    text: string;
    setStateFunction: React.Dispatch<React.SetStateAction<boolean>>;
    state: boolean;
  };
}> = ({ webLink, githubLink, extraToggleButton }) => {
  return (
    <Stack
      as={Flex}
      spacing="1.2rem"
      StackDir="column"
      align={["flex-start", null, null, "center"]}
    >
      <Flex flexDir={["column", null, null, "row"]}>
        <ButtonLink link={webLink} text="View Website" />
        {extraToggleButton ? (
          <Button
            _hover={{ textDecor: "none", color: "mainGrey", bgColor: "white" }}
            color="white"
            bgColor="mainGrey"
            mt={["1rem", null, null, "0"]}
            ml={[null, null, null, "1rem"]}
            onClick={() => {
              const { setStateFunction, state } = extraToggleButton;
              setStateFunction(!state);
            }}
          >
            {extraToggleButton.text}
          </Button>
        ) : (
          ""
        )}
      </Flex>
      <GithubLink githubLink={githubLink} />
    </Stack>
  );
};

export default Links;
