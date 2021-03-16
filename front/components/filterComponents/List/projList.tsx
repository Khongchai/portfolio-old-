import { Box, Flex, Grid, Heading, Img, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";

interface ProjListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  paginateForward: () => void;
  paginateBackward: () => void;
  searchFetching: Boolean;
}

export const ProjList: React.FC<ProjListProps> = ({
  searchFetching,
  data,
  setDetails,
  paginateForward,
  paginateBackward,
}) => {
  return (
    <>
      <Flex
        gridColumn="left-padding-end / right-padding-end"
        bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
        id="projects-view"
        boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
        borderRadius="22px"
        flexDir="column"
        pos="relative"
        gridRow="3"
      >
        <Flex placeItems="center">
          <Heading size="lg" mb={2}>
            Projects
          </Heading>
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
          {searchFetching ? (
            <Grid w="100%" h="100%" placeItems="center">
              Loading...
            </Grid>
          ) : (
            data?.projects.projects.map((proj) => (
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
                  localStorage.setItem(
                    "savedSelection",
                    JSON.stringify(project)
                  );
                  setDetails(project);
                }}
                className="project-container"
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
                <Heading as="h2" size="md" flex="0.1">
                  {proj.title}
                </Heading>
                <Text align="center" flex="0.1">
                  {proj.shortDescription}
                </Text>
              </Flex>
            ))
          )}
        </Flex>
        {data?.projects.isFirstQuery ? null : (
          <PaginateBackward paginateBackward={paginateBackward} />
        )}
        {data?.projects.isLastQuery ? null : (
          <PaginateForward paginateForward={paginateForward} />
        )}
      </Flex>
    </>
  );
};

export default ProjList;

const PaginateForward: React.FC<{ paginateForward: () => void }> = ({
  paginateForward,
}) => {
  return (
    <Img
      id="loadmore-indicator"
      cursor="pointer"
      position="absolute"
      src="/graphics/arrow.png"
      transition=".3s"
      top="50%"
      zIndex="4"
      right="0"
      width="25px"
      transform="rotate(90deg) translateX(-50%)"
      _hover={{
        width: "35px",
        transform: "rotate(90deg) translateX(-50%)",
      }}
      onClick={() => {
        paginateForward();
      }}
    />
  );
};

const PaginateBackward: React.FC<{ paginateBackward: () => void }> = ({
  paginateBackward,
}) => {
  return (
    <Img
      id="loadmore-indicator"
      cursor="pointer"
      position="absolute"
      src="/graphics/arrow.png"
      transition=".3s"
      top="50%"
      zIndex="4"
      left="0"
      width="25px"
      transform="rotate(-90deg) translateX(50%)"
      _hover={{
        width: "35px",
        transform: "rotate(-90deg) translateX(50%)",
      }}
      onClick={() => {
        paginateBackward();
      }}
    />
  );
};
