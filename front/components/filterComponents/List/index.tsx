import { Flex, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  ProjectsQuery,
  ProjectEntity,
  useGetSingleProjectByTitleQuery,
} from "../../../generated/graphql";
import HighlightList from "./highlightList";
import ProjList from "./projList";

interface ListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  selection: string | undefined;
  details: ProjectEntity | undefined;
  paginateForward: () => void;
  paginateBackward: () => void;
}

const List: React.FC<ListProps> = ({
  data,
  setDetails,
  selection,
  details,
  paginateForward,
  paginateBackward,
}) => {
  const [runOnceAlready, setRunOnceAlready] = useState<boolean>(false);
  const [singleFetchParam, setSingleFetchParam] = useState<string | undefined>(
    undefined
  );
  const [{ data: singleProject, fetching }] = useGetSingleProjectByTitleQuery({
    variables: { title: singleFetchParam } as any,
  });

  const router = useRouter();

  useEffect(() => {
    if (!runOnceAlready) {
      if (selection) {
        //a selection is specified in the url param; a single query will be made
        setSingleFetchParam(selection);
        if (!fetching) {
          setDetails(singleProject?.getSingleProjectByTitle.proj!);
          setRunOnceAlready(true);
        }
      } else if (!fetching) {
        //a selection is not specified in the url param, load from localStorage instead, if exists
        loadFromLocalStorage();
        setRunOnceAlready(true);
      }
    }

    if (details?.title) {
      router.push({
        pathname: "/tech/filter",
        query: { selection: details.title },
      });
    }
  }, [details, fetching]);

  function loadFromLocalStorage() {
    const savedSelection = localStorage.getItem("savedSelection");
    if (savedSelection) setDetails(JSON.parse(savedSelection));
  }

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
        paginateForward={paginateForward}
        paginateBackward={paginateBackward}
        data={data}
        setDetails={setDetails}
      />
    </Grid>
  );
};

export default List;
