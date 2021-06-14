import { Flex, Grid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Timeline from "../components/timelineComponents/Timeline";
import TimelineOverview from "../components/timelineComponents/TimelineOverview";
import {
  ProjectEntity,
  useAllProjectsNotPaginatedQuery,
} from "../generated/graphql";
import removeDuplicatesFromArray from "../utils/generics/removeDuplicatesFromArray";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";

const Tech: React.FC<{ selection: string | undefined }> = ({ selection }) => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectEntity | null>(null);
  const [{ data }] = useAllProjectsNotPaginatedQuery();
  const [years, setYears] = useState<number[]>([]);
  const [navbarHeight, setNavbarHeight] = useState("");

  //this useeffect gets all the necessary data for timeline events
  useEffect(() => {
    if (data) {
      const allYears = data.allProjectsNotPaginated.map((proj) =>
        //date format = yyyy-mm-dd
        {
          const [yearStart] = proj.startDate.split("-");
          return parseInt(yearStart);
        }
      );
      const allYearsNoDuplicates = removeDuplicatesFromArray(allYears).sort();
      //add an extra year at the end and the beginning just for looks
      setYears([
        allYearsNoDuplicates[0] - 1,
        ...allYearsNoDuplicates,
        allYearsNoDuplicates[allYearsNoDuplicates.length - 1] + 1,
      ]);
    }
  }, [data]);

  /* Set timeline size */
  useEffect(() => {
    setNavbarHeight(getNavbarHeight());
  }, []);

  return (
    <Flex
      id="tech-timeline"
      overflow="hidden"
      flexDir="column"
      height={["auto", null, null, `calc(100vh - ${navbarHeight})`]}
    >
      <TimelineOverview
        selection={selection}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject as any}
        defaultSelection={data?.allProjectsNotPaginated[0]}
      />
      <Grid
        cursor="grab"
        onMouseDown={(e: any) => {
          e.target.style.cursor = "grabbing";
        }}
        onMouseUp={(e: any) => {
          e.target.style.cursor = "grab";
        }}
        minWidth="1200px"
        minHeight={["300px", null, "320px"]}
        id="timeline-container"
        flex="0.40"
      >
        <Timeline
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          years={years}
          data={data}
        />
      </Grid>
    </Flex>
  );
};

export default Tech;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedQuery = context.query;
  const { selection } = parsedQuery;
  return {
    props: {
      selection: selection || null,
    },
  };
};
