import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAllProjectsNotPaginatedQuery } from "../../generated/graphql";
import removeDuplicatesFromArray from "../../utils/generics/removeDuplicatesFromArray";
import setFirstHeightToSecondPadding from "../../utils/generics/setFirstHeightToSecondPadding";
import Timeline from "../../components/timelineComponents";
import setEventsYearsBorderPosition from "../../utils/timeline/setEventsYearsBorderPosition";

export default function Tech() {
  useEffect(() => {
    window.addEventListener("resize", setEventsYearsBorderPosition);
    return () => {
      window.removeEventListener("resize", setEventsYearsBorderPosition);
    };
  }, []);

  const [{ data }] = useAllProjectsNotPaginatedQuery();
  const [years, setYears] = useState<number[]>([]);
  //this useeffect gets all the necessary data
  useEffect(() => {
    if (data) {
      const allYears = data.allProjectsNotPaginated.map((proj) =>
        //date format = yyyy-mm-dd
        {
          const [yearStart, monthStart, dayStart] = proj.startDate.split("-");
          return parseInt(yearStart);
        }
      );
      const allYearsNoDuplicates = removeDuplicatesFromArray(allYears);
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
      <Grid
        flex="0.65"
        width="100%"
        bgColor="#444057"
        id="wallpaper-container"
        placeItems="center"
      >
        <Flex
          borderRadius="8px"
          bgColor="black"
          width="70%"
          height="80%"
          id="wallpaper"
        ></Flex>
      </Grid>

      <Grid
        cursor="grab"
        minWidth="1200px"
        id="timeline-container"
        maxHeight="100%"
        flex="0.35"
      >
        <Timeline years={years} data={data} />
      </Grid>
    </Flex>
  );
}
