import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";

interface ProjListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}

export const ProjList: React.FC<ProjListProps> = ({ data, setDetails }) => {
  return (
    <Flex
      flex="1"
      bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
      id="projects-view"
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      borderRadius="22px"
      flexDir="column"
    >
      <Heading mb={2}>Projects</Heading>
      <Grid
        gridTemplateColumns="1fr 1fr 1fr 1fr"
        gridTemplateRows="1fr"
        id="projects-container"
        w="100%"
        h="100%"
        placeItems="center"
        _hover={{}}
      >
        {data?.projects.map((proj) => (
          <Flex
            as={Stack}
            spacing="0.7rem"
            cursor="pointer"
            id={proj.title}
            key={proj.id}
            mt="2em"
            onClick={() => {
              const project = proj as ProjectEntity;
              localStorage.setItem("savedSelection", JSON.stringify(project));
              setDetails(project);
            }}
            className="project-container"
            w="100%"
            height="100%"
            flexDir="column"
            placeItems="center"
          >
            <Box w="85%" pt="85%" bgColor="mainGrey" borderRadius="22px" />
            <Text>{proj.title}</Text>
            <Text>{proj.shortDescription}</Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
};

export default ProjList;
