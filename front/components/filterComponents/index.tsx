import {
  Box,
  Heading,
  Stack,
  Flex,
  Text,
  Button,
  Link,
  Img,
} from "@chakra-ui/react";
import React from "react";
import { ProjectEntity, ProjectsQuery } from "../../generated/graphql";
import Links from "./ExternLinks";
import ExpandButton from "./technologyExpandButton";

export const InfoDisplay: React.FC<{ details: ProjectEntity | undefined }> = ({
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
          <ExpandButton />
        </Stack>
      )}
    </Flex>
  );
};

export const List: React.FC<{
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}> = ({ data, setDetails }) => {
  return (
    <Stack spacing={"1.5em"} flex="1">
      <Box overflowX="scroll">
        {data?.projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              const project = proj as ProjectEntity;
              localStorage.setItem("savedSelection", JSON.stringify(project));
              setDetails(project);
            }}
          >
            {proj.title}
          </div>
        ))}
      </Box>
    </Stack>
  );
};
