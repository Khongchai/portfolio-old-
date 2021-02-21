import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import Links from "./ExternLinks";
import ExpandButton from "./technologyExpandButton";

const InfoDisplay: React.FC<{ details: ProjectEntity | undefined }> = ({
  details,
}) => {
  return (
    <Flex flexDir="column" flex="1" pt="8rem">
      {!details ? (
        <Heading>Select a project to view details</Heading>
      ) : (
        <Stack px="6rem" spacing={"2rem"} height="100%">
          <Heading as="h2">{details.title}</Heading>
          <Text>
            Date: {details?.startDate} to {details?.endDate}
          </Text>
          <Text mb="3rem" textAlign="justify" style={{ textIndent: "1.4em" }}>
            {details?.description}
          </Text>
          <Links
            webLink={details.websiteLink}
            githubLink={details.githubLink}
          />
        </Stack>
      )}
      <ExpandButton />
    </Flex>
  );
};
export default InfoDisplay;
