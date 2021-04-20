import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React, { useEffect, useState } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { TechDetails } from "../../../types/TechDetails";
import { readFromParamOrStorage } from "../../../utils/generics/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/generics/setAndGetCurrentSelection/updateQueryParamOnChange";
import { ProjectDescription } from "../../shared/ProjectDescription";

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
  const [showTech, setShowTech] = useState(false);

  //switch display mode between none and box between ProjectImage and Technologies after the fade transition is finished
  useEffect(() => {
    //TODO => might need to ditch css entirely and manage with js instead
  }, [showTech]);

  return (
    <Flex
      flex="0.60"
      height="min(100%, 500px)"
      bgColor="#444057"
      id="info-container"
      placeItems="center"
      p="20px 10% 20px 10%"
    >
      {selectedProject ? (
        <>
          <Box flex="0.4">
            <>
              <Box className={showTech ? "fadeOut" : "fadeIn"}>
                {selectedProject.imgLink ? (
                  <ProjectImage imgLink={selectedProject.imgLink} />
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
              {showTech ? (
                <Technologies
                  techDetails={{
                    backEnd: selectedProject.backEndTechnologies,
                    frontEnd: selectedProject.frontEndTechnologies,
                    hostingServices: selectedProject.hostingServices,
                    languages: selectedProject.languages,
                  }}
                />
              ) : null}
            </>
          </Box>
          <Stack
            as={Flex}
            flex="0.50"
            spacing="2em"
            p="1rem 1rem 1rem 1rem"
            textShadow="black 0px 2px 5px"
            ml={2}
          >
            <ProjectDescription
              extraToggleButton={{
                text: showTech ? "Hide Technologies" : "Show Technologies",
                setStateFunction: setShowTech,
                state: showTech,
              }}
              project={selectedProject}
            />
          </Stack>
        </>
      ) : (
        <div>loading...</div>
      )}
    </Flex>
  );
};

const ProjectImage: React.FC<{ imgLink: Maybe<string> }> = ({ imgLink }) => {
  return (
    <Flex
      borderRadius="20px"
      id="wallpaper"
      width="clamp(360px, 100%, calc(360px * 1.5))"
      pt="clamp(256px, 70%, calc(256px * 1.5))"
      backgroundImage={`url(${imgLink})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      boxShadow="dark-lg"
    />
  );
};

const Technologies: React.FC<{ techDetails: TechDetails }> = ({
  techDetails,
}) => {
  return (
    <Flex
      borderRadius="20px"
      id="wallpaper"
      width="clamp(360px, 100%, calc(360px * 1.5))"
      pt="clamp(256px, 70%, calc(256px * 1.5))"
    >
      {/* TODO: put TechnologiesComponents here */}
    </Flex>
  );
};

export default TimelineOverview;
