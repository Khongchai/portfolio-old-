import { Grid } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";
import { readFromParamOrStorageAndSet } from "../../../utils/generics/readFromParamOrStorageAndSet";
import HighlightList from "./highlightList";
import ProjList from "./projList";

interface ListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  selection: string | undefined;
  details: ProjectEntity | undefined;
  paginateForward: () => void;
  paginateBackward: () => void;
  searchFetching: Boolean;
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
  readFromParamOrStorageAndSet(
    setDetails,
    selection,
    details?.title,
    "/tech/filter"
  );

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
      gridTemplateRows="1fr 0.1fr 1fr"
      id="list-container"
    >
      <HighlightList setDetails={setDetails} />
      <ProjList
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
