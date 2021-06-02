import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAllProjectsNotPaginatedQuery } from "../../generated/graphql";

interface AdminAllProjectListProps {}

export const AdminAllProjectList: React.FC<AdminAllProjectListProps> = ({}) => {
  const [{ data, fetching }] = useAllProjectsNotPaginatedQuery();

  return (
    <Flex width="100%" height="auto" min-height="300px" flexWrap="wrap">
      {data?.allProjectsNotPaginated.map((proj) => {
        return (
          <ProjectSelect
            title={proj.title}
            url={proj.tinyImgLink as string | undefined}
          />
        );
      })}
    </Flex>
  );
};

const ProjectSelect: React.FC<{ title: string; url?: string }> = ({
  title,
  url,
}) => {
  return (
    <Box width="200px" height="200px" margin="auto">
      <Text>{title}</Text>
    </Box>
  );
};
