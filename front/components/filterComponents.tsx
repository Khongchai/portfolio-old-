import { Box, Heading, Stack, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity, ProjectsQuery } from "../generated/graphql";

export const List: React.FC<{ details: ProjectEntity | undefined }> = ({
  details,
}) => {
  return (
    <Box
      flex="1"
      px="3em"
      pt="7em"
      borderRight={[null, null, null, "1px solid black"]}
      borderBottom={["1px solid black", null, null]}
    >
      {!details ? (
        <Heading>Select a project to view details</Heading>
      ) : (
        <Stack spacing={"1.5em"}>
          <Box>
            <Heading textAlign="center">{details?.title}</Heading>
          </Box>
          <Flex justify="center">
            {details?.technologiesUsed?.map((tech) => (
              <Box m="1em">{tech.title}</Box>
            ))}
          </Flex>
          <Heading>About this project:</Heading>
          <Text>Date started: {details?.startDate} </Text>{" "}
          <Text>Date finished: {details?.endDate} </Text>
          <Text>{details?.description}</Text>
        </Stack>
      )}
    </Box>
  );
};

export const InfoDisplay: React.FC<{
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
