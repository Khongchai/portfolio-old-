import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../../generated/graphql";
import { setToLocalStorageAndSelectedState } from "../../../../utils/generics/setAndGetCurrentSelection/setToLocalStorageAndSelectedState";
import { TinyImg } from "./TinyImg";

interface IndexProps {
  projects: ProjectEntity[] | undefined;
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >;
  sectionTitle: string;
  fetching: boolean;
  gridRow: "Top" | "Bottom";
  extension?: any;
}

export const ProjectList: React.FC<IndexProps> = ({
  sectionTitle,
  projects,
  setStateFunction,
  fetching,
  gridRow,
  extension,
}) => {
  return (
    <Flex
      gridColumn="left-padding-end / right-padding-end"
      bg="linear-gradient(102.77deg, #423E55 -2.52%, rgba(74, 70, 94, 0.691587) 38.75%, rgba(92, 88, 113, 0) 100%, rgba(68, 64, 86, 0.627352) 100%), #636073;"
      className="projects-views"
      boxShadow="0px 8px 20px rgba(0, 0, 0, 0.1)"
      borderRadius="22px"
      flexDir="column"
      pos="relative"
      overflow="auto"
      gridRow={gridRow === "Top" ? "1" : "3"}
    >
      <Flex placeItems="center">
        <Heading fontSize="1.5rem" mb={2}>
          {sectionTitle}
        </Heading>
      </Flex>
      <Flex
        overflowX="scroll"
        className="projects-containers"
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
        {fetching ? (
          <Grid w="100%" h="100%" placeItems="center">
            Loading...
          </Grid>
        ) : (
          projects?.map((proj) => (
            <Flex
              cursor="pointer"
              key={proj.id}
              minW="220px"
              minH="220px"
              pb={2}
              onClick={() => {
                const project = proj as ProjectEntity;
                setToLocalStorageAndSelectedState(project, setStateFunction);
              }}
              className={`project-container projects ${proj.title}`}
              flexDir="column"
              placeItems="center"
              css={{
                "* + *": {
                  marginTop: "0.5em",
                },
              }}
            >
              <TinyImg tinyImgLink={proj.tinyImgLink} />
              <Heading size="md" flex="0.1">
                {proj.title}
              </Heading>
              <Text flex="0.1">{proj.shortDescription}</Text>
            </Flex>
          ))
        )}
      </Flex>
      {extension}
    </Flex>
  );
};
