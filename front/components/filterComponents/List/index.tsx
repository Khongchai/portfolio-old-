import { Flex, Stack } from "@chakra-ui/react";
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
    <Stack
      css={{ "> *": { padding: "1.6em" } }}
      as={Flex}
      flexDir="column"
      height="100%"
      spacing={"1.5em"}
      flex="1"
      maxW="50%"
    >
      <HighlightList setDetails={setDetails} />
      <ProjList
        paginateForward={paginateForward}
        paginateBackward={paginateBackward}
        data={data}
        setDetails={setDetails}
      />
    </Stack>
  );
};

export default List;
