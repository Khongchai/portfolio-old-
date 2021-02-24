import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import Links from "./ExternLinks";
import ExpandButton from "./technologyExpandButton";

const InfoDisplay: React.FC<{ details: ProjectEntity | undefined }> = ({
  details,
}) => {
  return (
    <Grid
      gridTemplateColumns=" 0.7fr [left-padding-end] repeat(4, minmax(auto, 1fr)) [right-padding-end] 0.7fr "
      gridTemplateRows={[
        "1fr 0.2fr  auto",
        null,
        "1fr 1fr auto",
        "1fr 1fr auto",
      ]}
      minHeight="100%"
      flex="1"
    >
      {!details ? (
        <Heading gridColumn="left-padding-end / right-padding-end">
          Select a project to view details
        </Heading>
      ) : (
        <Stack
          gridColumn="left-padding-end / right-padding-end"
          gridRow="1"
          spacing={"2rem"}
          height="100%"
          id="project-description-section"
          transition=".3s"
        >
          <Heading as="h2">{details.title}</Heading>
          <Text>
            Date: {details?.startDate} to {details?.endDate}
          </Text>
          <Text mb="3rem" textAlign="justify" style={{ textIndent: "1.4em" }}>
            {details?.description}
          </Text>
          <Links
            webLink={details.websiteLink}
            githubLink={details.githubLink}
          />
        </Stack>
      )}
      {details ? (
        <ExpandButton
          frontEnd={details?.frontEndTechnologies}
          backEnd={details?.backEndTechnologies}
          hostingServices={details?.hostingServices}
          languages={details?.languages}
        />
      ) : null}
    </Grid>
  );
};
export default InfoDisplay;
