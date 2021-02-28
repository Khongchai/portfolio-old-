import { Flex, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProjectsQuery, ProjectEntity } from "../../../generated/graphql";
import HighlightList from "./highlightList";
import ProjList from "./projList";

interface ListProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  selection: string | undefined;
  details: ProjectEntity | undefined;
}

const List: React.FC<ListProps> = ({
  data,
  setDetails,
  selection,
  details,
}) => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (firstLoad) {
      if (selection) {
        //a selection is specified in the url param, load from that
        const HTMLObjWithProjID = document.getElementById(selection);
        HTMLObjWithProjID?.click();
      } else {
        //a selection is not specified in the url param, load from localStorage instead, if exists
        loadFromLocalStorage();
      }
      setFirstLoad(false);
    }
    if (details?.title) {
      router.push({
        pathname: "/tech/filter",
        query: { selection: details.title },
      });
    }
  }, [details]);

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
      <ProjList data={data} setDetails={setDetails} />
    </Stack>
  );
};

export default List;
