import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React, { useState } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { TechDetails } from "../../../types/TechDetails";
import { readFromParamOrStorage } from "../../../utils/generics/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/generics/setAndGetCurrentSelection/updateQueryParamOnChange";
import { ProjectDescription } from "../../shared/ProjectDescription";
import { ExpandedContent } from "../../shared/TechnologiesDetails";

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

  return (
    <Flex
      flex="0.60"
      height="min(100%, 500px)"
      bgColor="#444057"
      id="info-container"
      placeItems={["flex-start", null, null, "center"]}
      p="20px 10% 20px 10%"
      flexDir={["column", null, null, "row"]}
    >
      {selectedProject ? (
        <>
          <LeftSection selectedProject={selectedProject} showTech={showTech} />
          <RightSection
            selectedProject={selectedProject}
            showTech={showTech}
            setShowTech={setShowTech}
          />
        </>
      ) : (
        <div>loading...</div>
      )}
    </Flex>
  );
};

const LeftSection: React.FC<{
  showTech: boolean;
  selectedProject: ProjectEntity;
}> = ({ showTech, selectedProject }) => {
  return (
    <Box
      flex="0.4"
      id="technologies-container"
      transition="width .3s"
      overflow-x={showTech ? "scroll" : "auto"}
      css={{
        "::-webkit-scrollbar": {
          width: "0.5rem",
          marginLeft: "1rem",
        },
        "::-webkit-scrollbar-track": {
          display: "none",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#545161",
          border: "3px solid transparent",
        },
      }}
    >
      {showTech ? (
        <Technologies
          techDetails={{
            backEnd: selectedProject.backEndTechnologies,
            frontEnd: selectedProject.frontEndTechnologies,
            hostingServices: selectedProject.hostingServices,
            languages: selectedProject.languages,
          }}
        />
      ) : (
        <Box>
          {selectedProject.imgLink ? (
            <ProjectImage imgLink={selectedProject.imgLink} />
          ) : (
            <Text
              display="block"
              textAlign="center"
              transform="rotate(20deg)"
              fontSize="1.5em"
              letterSpacing="1.7"
              className="fadein"
            >
              Preview Image Not Available
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

const RightSection: React.FC<{
  showTech: boolean;
  setShowTech: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProject: ProjectEntity;
}> = ({ showTech, setShowTech, selectedProject }) => {
  return (
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
  );
};

const ProjectImage: React.FC<{ imgLink: Maybe<string> }> = ({ imgLink }) => {
  return (
    <Flex
      borderRadius="20px"
      id="wallpaper"
      width={"clamp(360px * 0.8, 100%, calc(360px * 1.5))"}
      pt="clamp(256px * 0.8, 70%, calc(256px * 1.5))"
      backgroundImage={`url(${imgLink})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      boxShadow="dark-lg"
      className="fadein"
    />
  );
};

const Technologies: React.FC<{ techDetails: TechDetails }> = ({
  techDetails,
}) => {
  return (
    <Flex
      className="fadein"
      width="clamp(360px, 100%, calc(360px * 1.5))"
      height="auto"
      overflowY="scroll"
      overflowX="hidden"
      flexDir="column"
      bgColor="grey2"
      padding={4}
      borderRadius="5px"
      css={{
        "::-webkit-scrollbar": {
          width: "0.5rem",
          marginLeft: "1rem",
        },
        "::-webkit-scrollbar-track": {
          display: "none",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#545161",
          border: "3px solid transparent",
        },
      }}
    >
      <ExpandedContent
        hideTopDescription={true}
        techDetails={techDetails}
        expansionStat="expanded"
      />
    </Flex>
  );
};

export default TimelineOverview;
