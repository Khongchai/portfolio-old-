import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../../generated/graphql";
import { ProjectItem } from "./ProjectItem";

interface IndexProps {
  projects: ProjectEntity[] | undefined;
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >;
  sectionTitle: string;
  fetching: boolean;
  gridRow: "Top" | "Bottom";
  extension?: any;
  enableSeeAllButton?: boolean;
  showAllProjectsState?: {
    showAllProjects: boolean;
    setShowAllProjects: React.Dispatch<React.SetStateAction<boolean>>;
  };
  zIndex: number;
}

export const ProjectList: React.FC<IndexProps> = ({
  sectionTitle,
  projects,
  setStateFunction,
  fetching,
  gridRow,
  extension,
  enableSeeAllButton,
  showAllProjectsState,
  zIndex,
}) => {
  return (
    <Flex
      gridColumn="left-padding-end / right-padding-end"
      // bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
      bg="black2"
      className={`projects-views`}
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      borderRadius="22px"
      flexDir="column"
      pos="relative"
      overflow="auto"
      zIndex={zIndex}
      // When user clicks on Show All, set the height of the element
      //that show all projects to full, hiding in the process the element
      //that shows highlights.
      gridRow={
        showAllProjectsState?.showAllProjects
          ? "1 / -1"
          : gridRow === "Top"
          ? "1"
          : "3"
      }
    >
      <Flex>
        <Heading fontSize="1.5rem" mb={2}>
          {showAllProjectsState?.showAllProjects
            ? "All Projects"
            : sectionTitle}
        </Heading>
        {enableSeeAllButton ? (
          <Text
            cursor="pointer"
            ml="auto"
            _hover={{ color: "mainOrange", transition: ".2s" }}
            onClick={() => {
              if (showAllProjectsState) {
                const { showAllProjects, setShowAllProjects } =
                  showAllProjectsState;
                setShowAllProjects(!showAllProjects);
              }
            }}
          >
            {showAllProjectsState?.showAllProjects ? "Show less" : "Show All"}
          </Text>
        ) : null}
      </Flex>

      <Flex
        overflowX={showAllProjectsState?.showAllProjects ? "unset" : "scroll"}
        flexWrap={showAllProjectsState?.showAllProjects ? "wrap" : "nowrap"}
        className="projects-containers"
        width="100%"
        h="100%"
        css={{
          "::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#727272",
            opacity: "0.4",
            borderRadius: "10px",
          },
        }}
      >
        {fetching && !projects ? (
          <Grid w="100%" h="100%" placeItems="center">
            Loading...
          </Grid>
        ) : (
          projects?.map((proj) => (
            <ProjectItem
              proj={proj}
              setStateFunction={setStateFunction}
              showAllProjects={showAllProjectsState?.showAllProjects}
            />
          ))
        )}
      </Flex>
      {extension}
    </Flex>
  );
};
