import React from "react";
import {
  ProjectEntity,
  useGetHighlightedProjectsQuery,
} from "../../../generated/graphql";
import ProjectList from "./ProjectList";

interface HighlightListProps {
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}

const HighlightList: React.FC<HighlightListProps> = ({ setDetails }) => {
  const [{ data }] = useGetHighlightedProjectsQuery();
  //bad naming; getHighlightedProjects is not a function, but a list of objects
  const highlightedProjects = data?.getHighlightedProjects;

  return (
    <ProjectList projects={highlightedProjects} setStateFunction={setDetails} />
  );
};
export default HighlightList;

/*
{highlightedProjects
        ? highlightedProjects.map((proj) => (
            <div onClick={() => setDetails(proj)}>{proj.title}</div>
          ))
        : null}
*/
