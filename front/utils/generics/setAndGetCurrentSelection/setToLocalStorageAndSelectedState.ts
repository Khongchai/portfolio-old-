import { ProjectEntity } from "../../../generated/graphql";

export function setToLocalStorageAndSelectedState(
  project: ProjectEntity,
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >
) {
  localStorage.setItem("savedSelection", JSON.stringify(project));
  setStateFunction(project);
}
