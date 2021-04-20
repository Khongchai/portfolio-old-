import React from "react";
import { ProjectEntity } from "../../generated/graphql";
import Links from "./Links";
import { ProjectDetails } from "./ProjectDetails";

interface ProjectDescriptionProps {
  project: ProjectEntity;
  extraToggleButton?: {
    text: string;
    setStateFunction: React.Dispatch<React.SetStateAction<boolean>>;
    state: boolean;
  };
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  project,
  extraToggleButton,
}) => {
  return (
    <>
      <ProjectDetails mb="1.5rem" details={project} />
      <Links
        webLink={project.websiteLink}
        extraToggleButton={extraToggleButton}
        githubLink={project.githubLink}
      />
    </>
  );
};
