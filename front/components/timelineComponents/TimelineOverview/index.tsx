import { Box, Button, Flex, Grid, Heading, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import Links from "../../shared/Links";
import { ProjectDetails } from "../../shared/ProjectDetails";

const TimelineOverview: React.FC<{
  selectedProject: ProjectEntity | null;
  defaultSelection: ProjectEntity | undefined;
  dataFetching: boolean;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
}> = ({
  dataFetching,
  selectedProject,
  setSelectedProject,
  defaultSelection,
}) => {
  useEffect(() => {
    if (!selectedProject && defaultSelection) {
      setSelectedProject(defaultSelection);
    }
  }, [dataFetching]);

  return (
    <Grid
      flex="0.60"
      width="100%"
      bgColor="#444057"
      id="wallpaper-container"
      placeItems="center"
    >
      {selectedProject ? (
        <>
          <Flex
            borderRadius="8px"
            bgColor="black"
            width="83%"
            height="85%"
            id="wallpaper"
            p="1rem 1rem 1rem 1rem"
            justify="center"
            align="center"
          >
            <Box className="left-padding" flex="0.10" />
            <Stack as={Flex} flex="0.50" spacing="2em" p="1rem 1rem 1rem 1rem">
              <ProjectDetails details={selectedProject} />
            </Stack>
            <Flex
              ml="auto"
              flex="0.25"
              align="center"
              justify="center"
              p="1rem 1rem 1rem 1rem"
            >
              <Links
                githubLink={selectedProject.githubLink}
                webLink={selectedProject.websiteLink}
              />
            </Flex>
            <Box className="left-padding" flex="0.10" />
          </Flex>
        </>
      ) : (
        <div>loading...</div>
      )}
    </Grid>
  );
};

export default TimelineOverview;
