import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TechnologyEntity } from "../../../generated/graphql";

const GLOBAL_TRANSITION = 3;

interface TechDetails {
  frontEnd: TechnologyEntity[] | null | undefined;
  backEnd: TechnologyEntity[] | null | undefined;
  languages: TechnologyEntity[] | null | undefined;
  hostingServices: TechnologyEntity[] | null | undefined;
}

const ExpandButton: React.FC<TechDetails> = (techDetails) => {
  const [expansionStat, setExpansionStat] = useState("notExpanded");

  function manageExpansion() {
    const techContainerContainer = document.getElementById(
      "tech-container-container"
    );
    const techContainer = document.getElementById("tech-container");
    const arrow = document.getElementById("arrow");
    const currDir =
      expansionStat === "notExpanded" ? "expanded" : "notExpanded";
    setExpansionStat(currDir);
    const techHeightOffsetVal = 60;

    //not expanded
    if (currDir === "notExpanded") {
      arrow!.style.transform = "translateY(-16%)";
      techContainerContainer!.style.top = "0px";
      techContainer!.style.height = "3.3rem";
    }
    //expanded
    else {
      arrow!.style.transform = "translateY(-16%) rotate(180deg)";
      const techcontainerHeight: string = window
        .getComputedStyle(techContainer!)
        .getPropertyValue("height");
      techContainerContainer!.style.top = `calc(-${techHeightOffsetVal}vh + ${techcontainerHeight})`;
      techContainer!.style.height = `${techHeightOffsetVal}vh`;
    }
  }

  return (
    <Box
      w="100%"
      height="auto"
      gridColumn="left-padding-end / right-padding-end"
      pos="relative"
      top="0px"
      id="tech-container-container"
      transition={`.${GLOBAL_TRANSITION}s`}
      onClick={() => manageExpansion()}
    >
      <Box
        bgColor="grey2"
        w="fit-content"
        pos="relative"
        borderRadius="50%"
        margin="0 auto"
        transform="translateY( 50%)"
      >
        <Img
          id="arrow"
          cursor="pointer"
          src="/graphics/arrow.png"
          pos="relative"
          transition={`.${GLOBAL_TRANSITION}s`}
          transform="translateY(-16%)"
          zIndex="4"
        />
      </Box>
      <ExpandArea expansionStat={expansionStat} techDetails={techDetails} />
    </Box>
  );
};

const ExpandArea: React.FC<{
  techDetails: TechDetails;
  expansionStat: string;
}> = ({ techDetails, expansionStat }) => {
  return (
    <Flex
      id="tech-container"
      w="100%"
      h="3.3rem"
      pos="absolute"
      bgColor="grey2"
      color="mainOrange"
      mb="1rem"
      cursor="pointer"
      p="0.5rem"
      borderRadius="10px"
      textAlign="center"
      fontWeight="bold"
      transition={`.${GLOBAL_TRANSITION}s`}
      justify="center"
      flexDir="column"
      overflow="hidden"
    >
      {expansionStat === "notExpanded" ? (
        <Text>Technologies used in this project</Text>
      ) : (
        <>
          <ExpandedContent techDetails={techDetails} />
        </>
      )}
    </Flex>
  );
};

//Manage component
const ExpandedContent: React.FC<{ techDetails: TechDetails }> = (
  props,
  ..._
) => {
  return <Text>Expanded content goes here</Text>;
};

export default ExpandButton;
