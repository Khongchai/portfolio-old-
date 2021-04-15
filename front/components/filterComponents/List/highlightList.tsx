import React from "react";
import {
  ProjectEntity,
  useGetHighlightedProjectsQuery,
} from "../../../generated/graphql";
import { ProjectList } from "./ProjectList/index";

interface HighlightListProps {
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}

const HighlightList: React.FC<HighlightListProps> = ({ setDetails }) => {
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
    />
  );
};
export default HighlightList;
