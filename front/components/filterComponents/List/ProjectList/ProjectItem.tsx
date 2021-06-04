import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity } from "../../../../generated/graphql";
import { setToLocalStorageAndSelectedState } from "../../../../utils/navigation/setAndGetCurrentSelection/setToLocalStorageAndSelectedState";
import { TinyImg } from "./TinyImg";

interface ProjectItemProps {
  proj: ProjectEntity;
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >;
  showAllProjects: boolean | undefined;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  proj,
  setStateFunction,
}) => {
  return (
    <Flex
      cursor="pointer"
      key={proj.id}
      minW="220px"
      minH="220px"
      pb={2}
      onClick={() => {
        const project = proj as ProjectEntity;
        setToLocalStorageAndSelectedState(project, setStateFunction);
      }}
      className={`project-container projects ${proj.title}`}
      flexDir="column"
      placeItems="center"
      css={{
        "* + *": {
          marginTop: "0.5em",
        },
      }}
    >
      <TinyImg tinyImgLink={proj.tinyImgLink} projTitle={proj.title} />
      <Heading size="md" flex="0.1">
        {proj.title}
      </Heading>
      <Text flex="0.1">{proj.shortDescription}</Text>
    </Flex>
  );
};
