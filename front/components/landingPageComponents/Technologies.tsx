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
  useTechnologiesQuery,
} from "../../generated/graphql";
import useHoverComponent from "../../utils/hooks/useHoverComponent";
import { InfoCard, TechLogo } from "../shared/TechnologiesLogo";
import Image from "next/image";
import { ButtonLink } from "../../elements/ButtonLink";

interface TechnologiesProps {}

export const Technologies: React.FC<TechnologiesProps> = ({}) => {
  const [{ fetching: allTechFetching, data: allTechData }] =
    useTechnologiesQuery();
  const [{ fetching: languagesFetching, data: languagesData }] =
    useGetOnlyLanguagesQuery();

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
      <Box id="tech">
        {hoverComponentName ? <InfoCard>{hoverComponentName}</InfoCard> : null}
        <TechSection
          title="Tech I Know"
          technologies={
            allTechData?.technologies as TechnologyEntity[] | undefined
          }
          fetching={allTechFetching}
          setHoverComponentName={setHoverComponentName}
        />
      </Box>
      <Box id="languages">
        <TechSection
          title="Lingo I Know"
          technologies={
            languagesData?.getOnlyLanguages as TechnologyEntity[] | undefined
          }
          fetching={languagesFetching}
          setHoverComponentName={setHoverComponentName}
        />
      </Box>
      <Box textAlign="left" margin="1rem !important">
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
        mt="3rem"
        p="5rem"
        bgColor="orangeWhiteForBackground"
        borderRadius="1rem"
        lineHeight="3.5rem"
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
    <>
      <Heading as="h2" mb="2rem">
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
          />
        ) : null}
      </Grid>
    </>
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
