import { Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TechDetails } from "../../types/TechDetails";
import useHoverComponent from "../../utils/hooks/useHoverComponent";
import { InfoCard, TechLogo } from "./TechnologiesLogo";

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
      background="#171717"
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
  const [hoveredComponentName, setHoverComponentName] =
    useState<string | undefined>();
  const [forceUpdate, setForceUpdate] = useState(false);
  useEffect(() => {
    setForceUpdate(!forceUpdate);
  }, [backEnd, hostingServices, languages, frontEnd]);

  //setHoverComponent
  useHoverComponent(hoveredComponentName);

  return (
    <>
      {hoveredComponentName ? (
        <InfoCard hoveredComponentName={hoveredComponentName} />
      ) : null}
      {hideTopDescription ? (
        ""
      ) : (
        <Text pb={3} fontSize="clamp(14px, 1vw, 1rem)">
          Technologies used in this project
        </Text>
      )}
      {expansionStat === "expanded" ? (
        <>
          <TechLogo
            setHoverComponentName={setHoverComponentName}
            tech={frontEnd}
            desc="Front"
            forceUpdate={forceUpdate}
          />
          <TechLogo
            setHoverComponentName={setHoverComponentName}
            tech={backEnd}
            desc="Back"
            forceUpdate={forceUpdate}
          />
          <TechLogo
            setHoverComponentName={setHoverComponentName}
            tech={languages}
            desc="Language"
            forceUpdate={forceUpdate}
          />
          <TechLogo
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
