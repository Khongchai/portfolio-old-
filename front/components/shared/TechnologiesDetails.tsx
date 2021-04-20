import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TechnologyEntity } from "../../generated/graphql";
import { TechDetails } from "../../types/TechDetails";

export const TechnologiesDetails: React.FC<{
  techDetails: TechDetails;
  expansion: {
    expansionStat: string;
    manageExpansion?: () => void;
  };
  transition: number;
}> = ({ techDetails, expansion, transition }) => {
  const { expansionStat, manageExpansion } = expansion;
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
      transition={`.${transition}s`}
      onClick={() => {
        if (manageExpansion) manageExpansion();
      }}
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
  const [hoverComponentName, setHoverComponentName] = useState<
    string | undefined
  >();
  useEffect(() => {
    let logo: HTMLElement;
    if (hoverComponentName) {
      logo = document.getElementById(hoverComponentName)!;
      const infoCard = document.getElementById("info-card")!;
      const logoLeft = logo.getBoundingClientRect().left;
      const logoTop = logo.getBoundingClientRect().top;
      const logoHeight = parseInt(
        window.getComputedStyle(logo).getPropertyValue("height")
      );
      const logoWidth = parseInt(
        window.getComputedStyle(logo).getPropertyValue("width")
      );
      infoCard.style.left = `${logoLeft + logoWidth / 2}px`;
      infoCard.style.top = `${logoTop - logoHeight - 30}px`;
    }
  }, [hoverComponentName]);

  return (
    <>
      {hoverComponentName ? <InfoCard>{hoverComponentName}</InfoCard> : null}
      <Text pb={3}>Technologies used in this project.</Text>
      {expansionStat === "expanded" ? (
        <>
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={frontEnd}
            desc="Front"
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={backEnd}
            desc="Back"
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={languages}
            desc="Language"
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={hostingServices}
            desc="Hosting"
          />
        </>
      ) : null}
    </>
  );
};

const Logo: React.FC<{
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  tech: TechnologyEntity[] | null | undefined;
  desc: string;
}> = ({ tech, desc, setHoverComponentName }) => {
  return (
    <Flex flex="auto" align="center">
      <Text>{desc}: </Text>
      <Flex
        justifyContent="space-evenly"
        flexWrap="wrap"
        className="logo-container"
        w="100%"
        align="center"
      >
        {tech?.map((front) => {
          const nameOriginal = front.title;
          const name = nameOriginal.toLowerCase();
          const nameNoSpace = name.replace(/[\s\.]+/g, "");
          let src = `/logos/${nameNoSpace}.png`;
          let img = (
            <Box>
              <Img
                onMouseOver={(e: any) => {
                  setHoverComponentName(e.target.id);
                }}
                onMouseOut={() => {
                  setHoverComponentName(undefined);
                }}
                onClick={(e: any) => {
                  e.stopPropagation();
                }}
                onError={(e: any) => {
                  /* prevent infinite loop by checking if "svg" is already checked */
                  if (e.target.src.slice(-3) !== `svg`) {
                    e.target.src = `/logos/${nameNoSpace}.svg`;
                  } else {
                    /*
                      If get to this point, 1. tech does not have a logo OR 2. error loading
                      fix by just replacing with a text
                    */
                    const textContainer = document.createElement("p");
                    /*
                       hide the default placeholder image
                    */
                    (e.target as HTMLImageElement).style.display = "none";

                    const prevTextContainer = document.getElementById(
                      `${nameOriginal}-text-as-logo`
                    );
                    /*
                      Only perform the following if the prev container does not
                      have the following text already
                    */
                    if (!prevTextContainer) {
                      textContainer.id = `${nameOriginal}-text-as-logo`;
                      textContainer.innerHTML = `<p>${nameOriginal}</p>`;
                      textContainer.style.height = "fit-content";
                      e.target.parentNode.insertBefore(textContainer, e.target);
                      textContainer.style.color = "white";
                    }
                  }
                }}
                _hover={{
                  transform: "scale(1.3)",
                }}
                m="1rem"
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                padding={"1px"}
                key={nameOriginal}
                h={["25px", null, "40px"]}
                src={src}
                id={nameOriginal}
                transition=".2s"
              />
            </Box>
          );

          return img;
        })}
      </Flex>
    </Flex>
  );
};

const InfoCard: React.FC = ({ children }) => {
  return (
    <Box
      zIndex="100"
      backgroundColor="white"
      p={3}
      left="-1000px"
      id="info-card"
      position="fixed"
      borderRadius={4}
      boxSizing="content-box"
      pointerEvents="none"
      transform="translateX(-50%)"
    >
      {children}
    </Box>
  );
};
