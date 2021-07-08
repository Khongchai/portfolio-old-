import React from "react";
import {
  ProjectEntity,
  useGetHighlightedProjectsQuery,
} from "../../../generated/graphql";
import { ProjectList } from "./ProjectList/index";

interface HighlightListProps {
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  zIndex: number;
}

const HighlightList: React.FC<HighlightListProps> = ({
  setDetails,
  zIndex,
}) => {
  const [{ data, fetching }] = useGetHighlightedProjectsQuery();
  //bad naming; getHighlightedProjects is not a function, but a list of objects
  const highlightedProjects = data?.getHighlightedProjects;

  return (
    <ProjectList
      sectionTitle="Highlights"
      projects={highlightedProjects}
      setStateFunction={setDetails}
      gridRow={"Top"}
      fetching={fetching}
      zIndex={zIndex}
    />
  );
};
export default HighlightList;
