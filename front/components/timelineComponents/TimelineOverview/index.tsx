import { Box, Flex, Grid, Stack } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { readFromParamOrStorage } from "../../../utils/generics/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/generics/setAndGetCurrentSelection/updateQueryParamOnChange";
import Links from "../../shared/Links";
import { ProjectDetails } from "../../shared/ProjectDetails";

const TimelineOverview: React.FC<{
  selectedProject: ProjectEntity | null;
  defaultSelection: ProjectEntity | undefined;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >;
  selection: string | undefined;
}> = ({ selectedProject, setSelectedProject, selection, defaultSelection }) => {
  readFromParamOrStorage(setSelectedProject, selection, defaultSelection);
  updateQueryParamOnChange(selectedProject?.title, "/tech");

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
            backgroundImage="url('https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618160846/Screenshot_105_anpxok.png')"
            backgroundRepeat="no-repeat"
            backgroundSize="cover;"
            backgroundPosition="center center"
          >
            <Box className="left-padding" flex="0.10" />
            <Stack
              as={Flex}
              flex="0.50"
              spacing="2em"
              p="1rem 1rem 1rem 1rem"
              textShadow="black 0px 2px 5px"
            >
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
