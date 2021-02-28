import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
      <Flex placeItems="center">
        <Heading mb={2}>Projects</Heading>
        <Text _hover={{ cursor: "pointer" }} color="mainOrange" ml="auto">
          See all
        </Text>
      </Flex>

      <Flex
        overflowX="scroll"
        id="projects-container"
        width="100%"
        h="100%"
        _hover={{}}
        css={{
          "::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#423F56",
            opacity: "0.4",
            borderRadius: "10px",
          },
        }}
      >
        {data?.projects.map((proj) => (
          <Flex
            cursor="pointer"
            id={proj.title}
            class="projects"
            key={proj.id}
            minW="220px"
            minH="220px"
            pb={2}
            onClick={() => {
              const project = proj as ProjectEntity;
              localStorage.setItem("savedSelection", JSON.stringify(project));
              setDetails(project);
            }}
            className="project-container"
            flexDir="column"
            placeItems="center"
            css={{
              "* + *": {
                marginBottom: "0.5em",
              },
            }}
          >
            <Box
              w="200px"
              flex="0.8"
              margin={2}
              bgColor="mainGrey"
              borderRadius="22px"
            />
            <Heading as="h2" size="md" flex="0.1">
              {proj.title}
            </Heading>
            <Text flex="0.1">{proj.shortDescription}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ProjList;
