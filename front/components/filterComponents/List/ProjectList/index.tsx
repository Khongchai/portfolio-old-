import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../../generated/graphql";
import { setToLocalStorageAndSelectedState } from "../../../../utils/generics/setAndGetCurrentSelection/setToLocalStorageAndSelectedState";
import { TinyImg } from "./TinyImg";

interface IndexProps {
  projects: ProjectEntity[] | undefined;
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >;
}

const ProjectList: React.FC<IndexProps> = ({ projects, setStateFunction }) => {
  return (
    <Flex
      gridColumn="left-padding-end / right-padding-end"
      bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
      id="projects-view"
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      borderRadius="22px"
      overflow="auto"
      flexDir="column"
      pos="relative"
      gridRow="1"
    >
      <Flex placeItems="center">
        <Heading size="lg" mb={2}>
          Highlights
        </Heading>
      </Flex>
      <Flex
        overflowX="scroll"
        id="highlights-container"
        width="100%"
        h="100%"
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
        {projects?.map((proj) => (
          <Flex
            cursor="pointer"
            id={proj.title}
            key={proj.id}
            minW="220px"
            minH="220px"
            pb={2}
            onClick={() => {
              const project = proj as ProjectEntity;
              setToLocalStorageAndSelectedState(project, setStateFunction);
            }}
            className="project-container projects"
            flexDir="column"
            placeItems="center"
            css={{
              "* + *": {
                marginTop: "0.5em",
              },
            }}
          >
            <TinyImg />
            <Heading size="md" flex="0.1">
              {proj.title}
            </Heading>
            <Text flex="0.1">{proj.shortDescription}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ProjectList;
