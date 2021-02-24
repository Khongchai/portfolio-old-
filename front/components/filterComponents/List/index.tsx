import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProjectsQuery, ProjectEntity } from "../../../generated/graphql";

const List: React.FC<{
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  selection: string | undefined;
  details: ProjectEntity | undefined;
}> = ({ data, setDetails, selection, details }) => {
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
    <Stack spacing={"1.5em"} flex="1">
      <Box overflowX="scroll">
        {data?.projects.map((proj) => (
          <div
            id={proj.title}
            key={proj.id}
            onClick={() => {
              const project = proj as ProjectEntity;
              localStorage.setItem("savedSelection", JSON.stringify(project));
              setDetails(project);
            }}
          >
            {proj.title}
          </div>
        ))}
      </Box>
    </Stack>
  );
};

export default List;
