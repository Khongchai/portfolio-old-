import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import {
  ProjectEntity,
  useGetHighlightedProjectsQuery,
} from "../../../generated/graphql";

interface HighlightListProps {
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}

const HighlightList: React.FC<HighlightListProps> = ({ setDetails }) => {
  const [{ data }] = useGetHighlightedProjectsQuery();
  //bad naming; getHighlightedProjects is not a function, but a list of objects
  const highlightedProjects = data?.getHighlightedProjects;

  return (
    <Flex
      bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
      gridColumn="left-padding-end / right-padding-end"
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
        {highlightedProjects?.map((proj) => (
          <Flex
            cursor="pointer"
            id={proj.title}
            key={proj.id}
            minW="220px"
            minH="220px"
            pb={2}
            onClick={() => {
              const project = proj as ProjectEntity;
              localStorage.setItem("savedSelection", JSON.stringify(project));
              setDetails(project);
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
            <Box
              w="200px"
              flex="0.8"
              margin={2}
              bgColor="mainGrey"
              borderRadius="22px"
            />
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
export default HighlightList;

/*
{highlightedProjects
        ? highlightedProjects.map((proj) => (
            <div onClick={() => setDetails(proj)}>{proj.title}</div>
          ))
        : null}
*/
