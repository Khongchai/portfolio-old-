import { Box, Flex, Stack, Text } from "@chakra-ui/react";
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
    <Flex
      flex="0.60"
      height="min(100%, 500px)"
      bgColor="#444057"
      id="wallpaper-container"
      placeItems="center"
      p="20px 10% 20px 10%"
    >
      {selectedProject ? (
        <>
          <Box flex="0.4">
            {selectedProject.imgLink ? (
              <Flex
                borderRadius="20px"
                id="wallpaper"
                width="clamp(360px, 100%, calc(360px * 1.5))"
                pt="clamp(256px, 70%, calc(256px * 1.5))"
                backgroundImage={`url(${selectedProject.imgLink})`}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                backgroundPosition="center"
                boxShadow="dark-lg"
                placeItems="center"
              />
            ) : (
              <Text
                display="block"
                textAlign="center"
                transform="rotate(20deg)"
                fontSize="1.5em"
                letterSpacing="1.7"
              >
                Preview Image Not Available
              </Text>
            )}
          </Box>
          <Stack
            as={Flex}
            flex="0.50"
            spacing="2em"
            p="1rem 1rem 1rem 1rem"
            textShadow="black 0px 2px 5px"
          >
            <ProjectDetails details={selectedProject} />
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
          </Stack>
        </>
      ) : (
        <div>loading...</div>
      )}
    </Flex>
  );
};

export default TimelineOverview;
