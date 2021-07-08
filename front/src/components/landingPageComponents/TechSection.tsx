import { Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { TechnologyEntity } from "../../generated/graphql";
import { TechLogo } from "../shared/TechnologiesLogo";

export const TechSection: React.FC<{
  title: string;
  technologies?: TechnologyEntity[];
  fetching: boolean;
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}> = ({ title, technologies, fetching, setHoverComponentName }) => {
  return (
    <Grid id="tech-section">
      <Heading color="mainOrange" as="h2" mb="1.75rem">
        {title}
      </Heading>
      <Grid
        id="tech-container"
        padding="1rem"
        bgColor="backgroundOnBlack"
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
