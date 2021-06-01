import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { homeURL } from "../../../constants/homeUrl";
import { ProjectEntity } from "../../../generated/graphql";
import { TechDetails } from "../../../types/TechDetails";
import { readFromParamOrStorage } from "../../../utils/generics/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/generics/setAndGetCurrentSelection/updateQueryParamOnChange";
import { getCloudinaryResponsiveUrl } from "../../../utils/timeline/getCloudinaryResponsiveUrl";
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
  updateQueryParamOnChange(selectedProject?.title, homeURL);
  const [showTech, setShowTech] = useState(false);

  return (
    <Flex
      flex="0.60"
      height="min(100%, 500px)"
      bgColor="#444057"
      id="info-container"
      placeItems={["flex-start", null, null, "center"]}
      p="0 10% 20px 10%"
      pt={["5rem", null, null, "20px"]}
      flexDir={["column", null, null, "row"]}
    >
      {selectedProject ? (
        <>
          <PictureSection
            selectedProject={selectedProject}
            showTech={showTech}
          />
          <DescriptionSection
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

const PictureSection: React.FC<{
  showTech: boolean;
  selectedProject: ProjectEntity;
}> = ({ showTech, selectedProject }) => {
  return (
    <Box
      flex="0.4"
      id="technologies-container"
      transition="width .3s"
      width="100%"
      overflow-y="scroll"
      max-height="100%"
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
              p="6rem 0"
              letterSpacing="1.7"
              className="fadein"
            >
              {selectedProject.title === "Portfolio"
                ? "You Are Looking At It"
                : "Preview Image Not Available"}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

const DescriptionSection: React.FC<{
  showTech: boolean;
  setShowTech: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProject: ProjectEntity;
}> = ({ showTech, setShowTech, selectedProject }) => {
  return (
    <Stack
      as={Flex}
      flex="0.50"
      spacing="2em"
      p="1rem 0"
      textShadow="black 0px 2px 5px"
      ml={[0, null, null, 5]}
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

const ProjectImage: React.FC<{ imgLink: string }> = ({ imgLink }) => {
  const id = "wallpaper";
  const [responsiveImageUrl, setResponsiveImageUrl] = useState(
    getCloudinaryResponsiveUrl(imgLink, id)
  );

  useEffect(() => {
    //set current wallpaper
    setResponsiveImageUrl(getCloudinaryResponsiveUrl(imgLink, id));

    //fetch new image if screenresolution increases
    let timeoutHandler: any;
    function handleResize() {
      clearTimeout(timeoutHandler);
      timeoutHandler = setTimeout(() => {
        setResponsiveImageUrl(getCloudinaryResponsiveUrl(imgLink, id));
        removeEventListener("resize", handleResize);
      }, 100);
    }
    addEventListener("resize", handleResize);
  }, [imgLink]);
  return (
    <Flex
      borderRadius="20px"
      id={id}
      width={"clamp(360px * 0.8, 100%, calc(360px * 1.5))"}
      pt="clamp(256px * 0.8, 70%, calc(256px * 1.5))"
      backgroundImage={`url(${responsiveImageUrl})`}
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
      width="100%"
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
