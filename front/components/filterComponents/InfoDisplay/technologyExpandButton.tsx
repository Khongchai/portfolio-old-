import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
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
      techContainer!.style.background = "#636073";
      projDescSection!.style.opacity = "1";
    }
    //expanded
    else {
      arrow!.style.transform = " rotate(180deg)";
      //set the top side of techContainer to "desiredTopPosition"
      techContainer!.style.height = desiredTopPosition;
      techContainer!.style.background =
        "linear-gradient(102.77deg, #423E55 -2.52%, rgba(76, 72, 95, 0.627352) 62.8%, rgba(92, 88, 113, 0) 100%), #636073";
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
      transition={`.${GLOBAL_TRANSITION}s`}
      mt="6em"
    >
      <Img
        margin="0 auto"
        id="arrow"
        top="0"
        cursor="pointer"
        position="relative"
        src="/graphics/arrow.png"
        transition={`.${GLOBAL_TRANSITION}s`}
        transform="translateY(-221%)"
        zIndex="4"
        onClick={() => manageExpansion()}
      />
      <ExpandArea
        manageExpansion={manageExpansion}
        expansionStat={expansionStat}
        techDetails={techDetails}
      ></ExpandArea>
    </Box>
  );
};

const ExpandArea: React.FC<{
  techDetails: TechDetails;
  expansionStat: string;
  manageExpansion: () => void;
}> = ({ techDetails, expansionStat, manageExpansion }) => {
  return (
    <Stack
      spacing={"auto"}
      id="tech-container"
      w="100%"
      h="3.3rem"
      pos="absolute"
      bgColor="grey2"
      color="mainOrange"
      cursor="pointer"
      p={expansionStat === "expanded" ? "2rem" : "1rem"}
      borderRadius="10px"
      textAlign="center"
      overflow={expansionStat === "expanded" ? "scroll" : "hidden"}
      fontWeight="bold"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },

        "&::-webkit-scrollbar-track": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
      }}
      transition={`.${GLOBAL_TRANSITION}s`}
      onClick={() => manageExpansion()}
    >
      <ExpandedContent
        expansionStat={expansionStat}
        techDetails={techDetails}
      />
    </Stack>
  );
};

//Manage component
const ExpandedContent: React.FC<{
  techDetails: TechDetails;
  expansionStat: string;
}> = ({
  techDetails: { backEnd, hostingServices, languages, frontEnd },
  expansionStat,
}) => {
  return (
    <>
      <Text pb={3}>Technologies used in this project.</Text>
      {expansionStat === "expanded" ? (
        <>
          <Logo tech={frontEnd} desc="Front" />
          <Logo tech={backEnd} desc="Back" />
          <Logo tech={languages} desc="Language" />
          <Logo tech={hostingServices} desc="Hosting" />
        </>
      ) : null}
    </>
  );
};

const Logo: React.FC<{
  tech: TechnologyEntity[] | null | undefined;
  desc: string;
}> = ({ tech, desc }) => {
  return (
    <Flex flex="auto" align="center">
      <Text>{desc}: </Text>
      <Flex
        justifyContent="space-evenly"
        flexWrap="wrap"
        id="logo-container"
        w="100%"
      >
        {tech?.map((front) => {
          const nameOriginal = front.title;
          const name = nameOriginal.toLowerCase();
          const nameNoSpace = name.replace(/[\s\.]+/g, "");

          let src = `/logos/${nameNoSpace}.png`;
          let img = (
            <Img
              onMouseOver={(e) => {
                //show name, somehow
              }}
              onError={(e: any) => {
                e.target.src = `/logos/${nameNoSpace}.svg`;
              }}
              _hover={{
                borderRadius: "2px",
              }}
              m="1rem"
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              padding={"1px"}
              key={name}
              h={["25px", null, "40px"]}
              src={src}
              alt={nameNoSpace}
            />
          );

          return img;
        })}
      </Flex>
    </Flex>
  );
};

export default ExpandButton;
