import { Box, Flex, Grid } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useAllProjectsNotPaginatedQuery } from "../../generated/graphql";
import removeDuplicatesFromArray from "../../utils/removeDuplicatesFromArray";
import setPadding from "../../utils/setFirstHeightToSecondPadding";

export default function Tech() {
  const [{ data }] = useAllProjectsNotPaginatedQuery();
  const [years, setYears] = useState<number[]>([]);
  //fullDateStartNumber is for sorting
  const [fullDateStartNumber, setFullDateStartNumber] = useState<number[]>([]);
  const [fullDateStartString, setFullDateStartString] = useState<string[]>([]);
  const [fullDateEndString, setFullDateEndString] = useState<string[]>([]);

  //this useeffect gets all the necessary data
  useEffect(() => {
    if (data) {
      const allYears = data.allProjectsNotPaginated.map((proj) =>
        //date format = yyyy-mm-dd
        {
          const [yearStart, monthStart, dayStart] = proj.startDate.split("-");
          setFullDateStartNumber([
            ...fullDateStartNumber,
            parseInt(`${yearStart}${monthStart}${dayStart}`),
          ]);
          setFullDateStartString([...fullDateStartString, proj.startDate]);
          setFullDateEndString([...fullDateEndString, proj.endDate]);
          return parseInt(yearStart);
        }
      );
      const allYearsNoDuplicates = removeDuplicatesFromArray(allYears);
      setYears(allYearsNoDuplicates);
    }
  }, [data]);

  //set timeline size
  useEffect(() => {
    const timelinePage = document.getElementById("tech-timeline");
    const navbar = document.getElementById("navbar");
    if (timelinePage && navbar) {
      setPadding(navbar, timelinePage, 2);
    }
  }, []);

  return (
    <Box id="tech-timeline" height="100vh">
      <Grid
        width="100%"
        height="530px"
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
        cursor="pointer"
        minWidth="2000px"
        id="timeline-container"
        height="100%"
      >
        {fullDateStartNumber.map((date) => (
          <div>{date}</div>
        ))}
      </Grid>
    </Box>
  );
}
