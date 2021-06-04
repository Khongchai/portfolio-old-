import { ProjectEntity } from "../../../generated/graphql";

export function setToLocalStorageAndSelectedState(
  project: ProjectEntity,
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >,
  skipStorage?: boolean
) {
  if (!skipStorage) {
    localStorage.setItem("savedSelection", JSON.stringify(project));
  }
  // setFocusOnClick(String(project.id), `${project.id}-time-indicator`);
  setStateFunction(project);
}
