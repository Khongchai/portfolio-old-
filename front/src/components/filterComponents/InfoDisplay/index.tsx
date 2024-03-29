import { Grid, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { ProjectDescription } from "../../shared/ProjectDescription";
import ExpandButton from "./technologyExpandButton";

const InfoDisplay: React.FC<{
  details: ProjectEntity | undefined;
}> = ({ details }) => {
  return (
    <Grid
      gridTemplateColumns={[
        "0.1fr [left-padding-end] repeat(4, minmax(auto, 1fr)) [right-padding-end] 0.1fr",
        null,
        null,
        "0.7fr [left-padding-end] repeat(4, minmax(auto, 1fr)) [right-padding-end] 0.7fr",
      ]}
      gridTemplateRows={[
        "1fr 0.2fr  auto",
        null,
        "1fr 1fr auto",
        "1fr 1fr auto",
      ]}
      minHeight="100%"
      flex="1"
      id="info-display-container"
      mb="3em"
      zIndex="2"
      mt={["4rem", null, null, "0"]}
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
          background="rgba(0,0,0,0.7)"
          p="1rem"
        >
          <ProjectDescription project={details} />
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
