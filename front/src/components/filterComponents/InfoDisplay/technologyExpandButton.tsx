import { Box, Img } from "@chakra-ui/react";
import React, { useState } from "react";
import { TechDetails } from "../../../types/TechDetails";
import { TechnologiesDetails } from "../../shared/TechnologiesDetails";

const ExpandButton: React.FC<TechDetails> = (techDetails) => {
  const [expansionStat, setExpansionStat] =
    useState<"expanded" | "notExpanded">("notExpanded");
  const transition = 3;
  function manageExpansion() {
    const techContainerContainer = document.getElementById(
      "tech-container-container"
    );
    const techContainer = document.getElementById("tech-container");
    const arrow = document.getElementById("arrow");
    const currDir =
      expansionStat === "notExpanded" ? "expanded" : "notExpanded";
    setExpansionStat(currDir);

    const desiredTopPosition: string = "60vh";
    const projDescSection = document.getElementById(
      "project-description-section"
    );

    //not expanded
    if (currDir === "notExpanded") {
      arrow!.style.transform = "translateY(-221%)";
      arrow!.style.top = "0";
      techContainerContainer!.style.top = "0px";
      techContainer!.style.height = "3.3rem";
      techContainer!.style.background = "#171717";
      techContainer!.style.color = "#FA9D55";
      projDescSection!.style.opacity = "1";
    }
    //expanded
    else {
      arrow!.style.transform = " rotate(180deg)";
      //set the top side of techContainer to "desiredTopPosition"
      techContainer!.style.height = desiredTopPosition;
      techContainer!.style.background = "#bfb4a8";
      techContainer!.style.color = "white";
      arrow!.style.top = `-${desiredTopPosition}`;
      projDescSection!.style.opacity = "0.09";
    }
  }

  return (
    <Box
      w="100%"
      height="auto"
      gridColumn="left-padding-end / right-padding-end"
      pos="relative"
      gridRow="2"
      top="0px"
      d="flex"
      flexDir="column"
      justifyContent="flex-end"
      id="tech-container-container"
      transition={`.${transition}s`}
      mt="6em"
    >
      <Img
        margin="0 auto"
        id="arrow"
        top="0"
        cursor="pointer"
        position="relative"
        src="/graphics/arrow.png"
        transition={`.${transition}s`}
        transform="translateY(-221%)"
        zIndex="4"
        onClick={() => manageExpansion()}
      />
      <TechnologiesDetails
        expansion={{ expansionStat, manageExpansion }}
        techDetails={techDetails}
        transition={transition}
      ></TechnologiesDetails>
    </Box>
  );
};

export default ExpandButton;
