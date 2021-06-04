import { Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";
import { readFromParamOrStorage } from "../../../utils/navigation/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/navigation/setAndGetCurrentSelection/updateQueryParamOnChange";
import HighlightList from "./highlightList";
import Projects from "./Projects";
import { setAsSelected } from "../../../utils/animations/filter/setAsSelected";
import { useRouter } from "next/router";

interface ListProps {
  data: ProjectsQuery | undefined;
  selection: string | undefined;
  paginateForward: () => void;
  paginateBackward: () => void;
  searchFetching: boolean;
  showAllProjectsState: {
    showAllProjects: boolean;
    setShowAllProjects: React.Dispatch<React.SetStateAction<boolean>>;
  };
  detailsState: {
    details: ProjectEntity | undefined;
    setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  };
}

const List: React.FC<ListProps> = ({
  searchFetching,
  data,
  detailsState,
  selection,
  paginateForward,
  paginateBackward,
  showAllProjectsState,
}) => {
  const router = useRouter();
  const currentURL = router.pathname;
  const { setDetails, details } = detailsState;
  const { showAllProjects } = showAllProjectsState;

  readFromParamOrStorage(setDetails, selection);
  updateQueryParamOnChange(details?.title, currentURL);

  /**
   * For highlighting the selection on page enter and when duplicates are found in highlihgts and projects sections
   */
  useEffect(() => {
    if (selection) {
      setAsSelected(selection);
    }
  }, [selection]);

  return (
    <Grid
      css={{ "> *": { padding: "1.6em" } }}
      height="100%"
      spacing={"1.5em"}
      flex="1"
      gridTemplateColumns={[
        "0.3fr [left-padding-end] repeat(4, minmax(auto, 1fr)) [right-padding-end] 0.3fr",
        null,
        null,
        null,
        "0.3fr [left-padding-end] repeat(4, minmax(auto, 1fr)) [right-padding-end] 0.7fr",
      ]}
      gridTemplateRows="1fr 20px 1fr"
      id="list-container"
    >
      <HighlightList zIndex={50} setDetails={setDetails} />
      <Projects
        zIndex={51}
        searchFetching={searchFetching}
        paginateForward={paginateForward}
        paginateBackward={paginateBackward}
        data={data}
        setDetails={setDetails}
        showAllProjectsState={showAllProjectsState}
      />
    </Grid>
  );
};

export default List;
