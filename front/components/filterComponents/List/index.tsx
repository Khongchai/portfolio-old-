import { Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";
import { readFromParamOrStorage } from "../../../utils/generics/setAndGetCurrentSelection/readFromParamOrStorageAndSet";
import { updateQueryParamOnChange } from "../../../utils/generics/setAndGetCurrentSelection/updateQueryParamOnChange";
import HighlightList from "./highlightList";
import AllProjects from "./AllProjects";
import { homeURL } from "../../../constants/homeUrl";
import { setAsSelected } from "../../../utils/animations/filter/setAsSelected";

interface ListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  selection: string | undefined;
  details: ProjectEntity | undefined;
  paginateForward: () => void;
  paginateBackward: () => void;
  searchFetching: boolean;
}

const List: React.FC<ListProps> = ({
  searchFetching,
  data,
  setDetails,
  selection,
  details,
  paginateForward,
  paginateBackward,
}) => {
  readFromParamOrStorage(setDetails, selection);
  updateQueryParamOnChange(details?.title, homeURL + "filter");
  useEffect(() => {
    if (selection) {
      setAsSelected(selection);
    }
    /**
     * For highlighting the selection on page enter and when duplicates are found in highlihgts and projects sections
     */
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
      gridTemplateRows="auto minmax(20px, 1fr) auto"
      id="list-container"
    >
      <HighlightList setDetails={setDetails} />
      <AllProjects
        searchFetching={searchFetching}
        paginateForward={paginateForward}
        paginateBackward={paginateBackward}
        data={data}
        setDetails={setDetails}
      />
    </Grid>
  );
};

export default List;
