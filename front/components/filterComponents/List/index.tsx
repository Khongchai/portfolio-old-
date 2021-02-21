import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { ProjectsQuery, ProjectEntity } from "../../../generated/graphql";

const List: React.FC<{
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
}> = ({ data, setDetails }) => {
  return (
    <Stack spacing={"1.5em"} flex="1">
      <Box overflowX="scroll">
        {data?.projects.map((proj) => (
          <div
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
