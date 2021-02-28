import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import {
  ProjectEntity,
  useGetHighlightedProjectsQuery,
} from "../../../generated/graphql";

interface HighlightListProps {
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}

const HighlightList: React.FC<HighlightListProps> = ({ setDetails }) => {
  const [{ data, fetching }] = useGetHighlightedProjectsQuery();
  //bad naming; getHighlightedProjects is not a function, but a list of objects
  const highlightedProjects = data?.getHighlightedProjects;
  console.log("highlights: ", highlightedProjects);

  return (
    <Flex overflowX="scroll" flex="1">
      {highlightedProjects
        ? highlightedProjects.map((proj) => (
            <div onClick={() => setDetails(proj)}>{proj.title}</div>
          ))
        : null}
    </Flex>
  );
};
export default HighlightList;
