import { Img } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity, ProjectsQuery } from "../../../generated/graphql";
import { ProjectList } from "./ProjectList/index";

interface AllProjectsProps {
  data: ProjectsQuery | undefined;
  setDetails: React.Dispatch<React.SetStateAction<ProjectEntity | undefined>>;
  paginateForward: () => void;
  paginateBackward: () => void;
  searchFetching: boolean;
}

export const AllProjects: React.FC<AllProjectsProps> = ({
  searchFetching,
  data,
  setDetails,
  paginateForward,
  paginateBackward,
}) => {
  const PaginationChevrons = (
    <>
      {data?.projects.isFirstQuery ? null : (
        <PaginateBackward paginateBackward={paginateBackward} />
      )}
      {data?.projects.isLastQuery ? null : (
        <PaginateForward paginateForward={paginateForward} />
      )}
    </>
  );

  return (
    <ProjectList
      sectionTitle="Projects"
      setStateFunction={setDetails}
      projects={data?.projects.projects}
      fetching={searchFetching}
      gridRow={"Bottom"}
      extension={PaginationChevrons}
    />
  );
};

export default AllProjects;

const PaginateForward: React.FC<{ paginateForward: () => void }> = ({
  paginateForward,
}) => {
  return (
    <Img
      id="loadmore-indicator"
      cursor="pointer"
      position="absolute"
      src="/graphics/arrow.png"
      transition=".3s"
      top="50%"
      zIndex="4"
      right="0"
      width="25px"
      transform="rotate(90deg) translateX(-50%)"
      _hover={{
        width: "35px",
        transform: "rotate(90deg) translateX(-50%)",
      }}
      onClick={() => {
        paginateForward();
      }}
    />
  );
};

const PaginateBackward: React.FC<{ paginateBackward: () => void }> = ({
  paginateBackward,
}) => {
  return (
    <Img
      id="loadmore-indicator"
      cursor="pointer"
      position="absolute"
      src="/graphics/arrow.png"
      transition=".3s"
      top="50%"
      zIndex="4"
      left="0"
      width="25px"
      transform="rotate(-90deg) translateX(50%)"
      _hover={{
        width: "35px",
        transform: "rotate(-90deg) translateX(50%)",
      }}
      onClick={() => {
        paginateBackward();
      }}
    />
  );
};
