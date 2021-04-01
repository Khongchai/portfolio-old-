import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { ButtonLink } from "../../elements/ButtonLink";
import GithubLink from "../../elements/GithubLink";

const Links: React.FC<{
  webLink: string | null | undefined;
  githubLink: string;
}> = ({ webLink, githubLink }) => {
  return (
    <Stack as={Flex} spacing="1.2rem" StackDir="column" align="center">
      <ButtonLink link={webLink} text="View Website" />
      <GithubLink githubLink={githubLink} />
    </Stack>
  );
};

export default Links;
