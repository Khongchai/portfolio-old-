import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Img,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  TechnologyEntity,
  useGetOnlyLanguagesQuery,
  useGetTechnologiesAssignedToRoleQuery,
  useTechnologiesQuery,
} from "../../generated/graphql";
import useHoverComponent from "../../utils/hooks/useHoverComponent";
import { InfoCard, TechLogo } from "../shared/TechnologiesLogo";
import Image from "next/image";
import { ButtonLink } from "../../elements/ButtonLink";

interface TechnologiesProps {}

export const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const [{ fetching: fetchingTechnologies, data: technologiesData }] =
    useGetTechnologiesAssignedToRoleQuery();
  const languages = technologiesData?.getTechnologiesAssignedToRole.lang;

  const [hoverComponentName, setHoverComponentName] =
    useState<string | undefined>(undefined);
  useHoverComponent(hoverComponentName);

  return (
    <Stack
      id="technologies"
      gridRow="3"
      gridColumn="main-content-start/ main-content-end"
      padding="2rem"
      spacing="3rem"
      textAlign="center"
    >
      <Box css={{ "> *": { marginBottom: "3rem" } }} id="tech">
        {/* Cannot use the lobotomized owl selector because the InfoCard is added dynamically as first child */}
        {hoverComponentName ? <InfoCard>{hoverComponentName}</InfoCard> : null}
        <TechSection
          title="Frontend Tech I know"
          technologies={
            technologiesData?.getTechnologiesAssignedToRole
              .front as TechnologyEntity[]
          }
          fetching={fetchingTechnologies}
          setHoverComponentName={setHoverComponentName}
        />

        <TechSection
          title="Backend Tech I Know"
          technologies={
            technologiesData?.getTechnologiesAssignedToRole
              .back as TechnologyEntity[]
          }
          fetching={fetchingTechnologies}
          setHoverComponentName={setHoverComponentName}
        />
        <TechSection
          title="Hosting Services I use"
          technologies={
            technologiesData?.getTechnologiesAssignedToRole
              .hosting as TechnologyEntity[]
          }
          fetching={fetchingTechnologies}
          setHoverComponentName={setHoverComponentName}
        />
        <TechSection
          title="Lingo I Know"
          technologies={languages as TechnologyEntity[] | undefined}
          fetching={fetchingTechnologies}
          setHoverComponentName={setHoverComponentName}
        />
        <Box textAlign="left" margin="0.5rem !important">
          <span>
            <small>If it matters: </small>
          </span>
          <span>
            <Flag path="/spokenLanguages/th.png" fallbackText="Thai Flag" />
            <Flag path="/spokenLanguages/en.png" fallbackText="English Flag" />
            <Flag path="/spokenLanguages/de.png" fallbackText="German Flag" />
            <Flag path="/spokenLanguages/ru.png" fallbackText="Russian Flag" />
          </span>
        </Box>
      </Box>

      <Box id="other">
        <Heading as="h2" mb="2rem">
          Other Applications
        </Heading>
        <Flex justifyContent="space-evenly" width="100%">
          <Stack spacing="1rem">
            <Img src="/otherLogos/figma.png" />
            <Text as="h6">Figma (very often)</Text>
          </Stack>
          <Stack spacing="1rem">
            <Img src="/otherLogos/aftereffects.png" />
            <Text as="h6">Afer Effects (often)</Text>
          </Stack>
          <Stack spacing="1rem">
            <Img src="/otherLogos/blender.png" />
            <Text as="h6">Blender (sometimes)</Text>
          </Stack>
        </Flex>
      </Box>
      <Text
        p={["0.45rem", "2rem", "3rem", "4rem", "5rem"]}
        fontSize={["14px", null, "16px"]}
        bgColor="orangeWhiteForBackground"
        borderRadius="1rem"
        lineHeight={["2.4rem", null, "3.5rem"]}
      >
        You can view my past works in two formats, one focuses on the
        <ButtonLink text="Chronological Order" link="/timeline" />, while the
        other focuses on
        <ButtonLink text="Accessibility" link="/filter" />.
      </Text>
    </Stack>
  );
};

const TechSection: React.FC<{
  title: string;
  technologies?: TechnologyEntity[];
  fetching: boolean;
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}> = ({ title, technologies, fetching, setHoverComponentName }) => {
  return (
    <Grid id="tech-section">
      <Heading as="h2" mb="1.75rem">
        {title}
      </Heading>
      <Grid
        id="tech-container"
        padding="1rem"
        bgColor="orangeWhiteForBackground"
        borderRadius="1rem"
        placeItems="center"
      >
        {!fetching && technologies ? (
          <TechLogo
            setHoverComponentName={setHoverComponentName}
            tech={technologies as TechnologyEntity[]}
            noBorder={true}
            noSpace={true}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

const Flag: React.FC<{ path: string; fallbackText: string }> = ({
  path,
  fallbackText,
}) => {
  return (
    <Box display="inline" marginLeft="5px">
      <Image width={14 * 1.3} height={9 * 1.3} src={path} alt={fallbackText} />
    </Box>
  );
};
