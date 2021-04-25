import { Box, Flex, Img, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TechnologyEntity } from "../../generated/graphql";
import { TechDetails } from "../../types/TechDetails";

export const TechnologiesDetails: React.FC<{
  techDetails: TechDetails;
  expansion: {
    expansionStat: "expanded" | "notExpanded";
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
export const ExpandedContent: React.FC<{
  techDetails: TechDetails;
  expansionStat: string;
  hideTopDescription?: boolean;
}> = ({
  techDetails: { backEnd, hostingServices, languages, frontEnd },
  expansionStat,
  hideTopDescription,
}) => {
  const [hoverComponentName, setHoverComponentName] = useState<
    string | undefined
  >();
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    setForceUpdate(!forceUpdate);
  }, [backEnd, hostingServices, languages, frontEnd]);

  //setHoverComponent
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
      {hideTopDescription ? (
        ""
      ) : (
        <Text pb={3}>Technologies used in this project.</Text>
      )}
      {expansionStat === "expanded" ? (
        <>
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={frontEnd}
            desc="Front"
            forceUpdate={forceUpdate}
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={backEnd}
            desc="Back"
            forceUpdate={forceUpdate}
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={languages}
            desc="Language"
            forceUpdate={forceUpdate}
          />
          <Logo
            setHoverComponentName={setHoverComponentName}
            tech={hostingServices}
            desc="Hosting"
            forceUpdate={forceUpdate}
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
  forceUpdate: boolean;
}> = ({ tech, desc, setHoverComponentName, forceUpdate }) => {
  if (!tech || tech.length === 0) {
    return <></>;
  }
  const [textsAsLogos, setTextsAsLogos] = useState<string[]>([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    if (update !== forceUpdate) {
      setTextsAsLogos([]);
    }
    setUpdate(forceUpdate);
  }, [forceUpdate]);

  return (
    <Flex
      flex="auto"
      align="center"
      pb={"6px"}
      // borderBottom="1px groove #444057"
    >
      <Box height="100%">
        <Text>{desc}: </Text>
      </Box>
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
                    setTextsAsLogos([...textsAsLogos, nameOriginal]);
                    (e.target as HTMLImageElement).style.display = "none";
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
        {textsAsLogos.map((text) => (
          <Text>{text}</Text>
        ))}
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
      color="mainOrange"
      fontWeight="bold"
    >
      {children}
    </Box>
  );
};
