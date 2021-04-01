import { Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/timelineComponents/Timeline";
import TimelineOverview from "../../components/timelineComponents/TimelineOverview";
import {
  ProjectEntity,
  useAllProjectsNotPaginatedQuery,
} from "../../generated/graphql";
import removeDuplicatesFromArray from "../../utils/generics/removeDuplicatesFromArray";
import setFirstHeightToSecondPadding from "../../utils/generics/setFirstHeightToSecondPadding";
import setEventsYearsBorderPosition from "../../utils/timeline/setEventsYearsBorderPosition";
import setQueryParam from "../../utils/generics/setQueryParam";

export default function Tech() {
  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(
    null
  );
  const [{ data, fetching: dataFetching }] = useAllProjectsNotPaginatedQuery();
  const [years, setYears] = useState<number[]>([]);
  //this useeffect gets all the necessary data

  useEffect(() => {
    window.addEventListener("resize", setEventsYearsBorderPosition);
    return () => {
      window.removeEventListener("resize", setEventsYearsBorderPosition);
    };
  }, []);

  useEffect(() => {
    if (selectedProject?.title) {
      setQueryParam(selectedProject.title, "/tech");
    }
  }, [selectedProject]);

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

  //set timeline size
  useEffect(() => {
    const timelinePage = document.getElementById("tech-timeline");
    const navbar = document.getElementById("navbar");
    if (timelinePage && navbar) {
      setFirstHeightToSecondPadding(navbar, timelinePage, 2);
    }
  }, []);

  return (
    <Flex id="tech-timeline" overflowX="hidden" flexDir="column" height="100vh">
      <TimelineOverview
        dataFetching={dataFetching}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
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
        id="timeline-container"
        maxHeight="100%"
        flex="0.40"
      >
        <Timeline
          setSelectedProject={setSelectedProject}
          years={years}
          data={data}
        />
      </Grid>
    </Flex>
  );
}
