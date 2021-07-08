import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../generated/graphql";

export const ProjectDetails: React.FC<{
  details: ProjectEntity;
  mb?: string;
}> = ({ details, mb }) => {
  return (
    <>
      <Heading as="h2">{details.title}</Heading>
      <Text>
        Date: &nbsp; <i>{`${details?.startDate} `}</i>
        &nbsp; to &nbsp;
        <i>{details.endDate ? details.endDate : "present"}</i>
      </Text>
      <Box
        pr="0.5em"
        marginBottom={mb ? mb : ""}
        overflowY="auto"
        textAlign="justify"
        height={["fit-content", null, null, "min(170px, 170px)"]}
        style={{ textIndent: "1.4em" }}
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
        dangerouslySetInnerHTML={createHTML(details.description)}
      />
    </>
  );
};
//black 0px 2px 4px

function createHTML(text: string) {
  return { __html: text };
}
