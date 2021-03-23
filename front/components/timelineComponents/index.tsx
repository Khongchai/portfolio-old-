import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AllProjectsNotPaginatedQuery } from "../../generated/graphql";
import ProjectAsTimelineEvent from "./ProjectAsTimelineEvent";
import setEventsYearsBorderPosition from "../../utils/timeline/setEventsYearsBorderPosition";
import setScrollPositionTo2019 from "../../utils/timeline/setScrollPositionTo2019";

interface timelineProps {
  years: number[];
  fullDateStartNumber: number[];
  fullDateStartString: string[];
  fullDateEndString: string[];
  data: AllProjectsNotPaginatedQuery | undefined;
}

interface GridRowPos {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
}

export const timeline: React.FC<timelineProps> = ({
  years,
  fullDateStartNumber,
  fullDateEndString,
  fullDateStartString,
  data,
}) => {
  const gridRowPos = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  useEffect(() => {
    setEventsYearsBorderPosition();
    //TO BE IMPLEMENTED
    //2019 === first year of coding
    setScrollPositionTo2019();
  }, []);

  const oneMonthLengthInPixel = "40px";
  const twelveMonths = 12;

  //manageTimelineScroll
  const gridTemplateColumns = `repeat(${
    years.length * twelveMonths
  }, ${oneMonthLengthInPixel})`;
  return (
    <Grid gridTemplateRows="[timeline-top] 0.78fr [timeline-bottom] 0.22fr [timeline-padding-bottom]">
      <Grid
        id="events-container"
        gridRow="timeline-top / timeline-bottom"
        flexDir="row"
        gridTemplateColumns={gridTemplateColumns}
        //number of row is arbitrary (as long as there is enough)
        gridTemplateRows="1fr 1fr 1fr 1fr 1fr"
      >
        {data?.allProjectsNotPaginated.map((proj, i) => {
          return (
            <ProjectAsTimelineEvent
              proj={proj}
              index={i}
              firstYearInTimeline={years[0]}
              gridRowPos={gridRowPos}
            />
          );
        })}

        {years.map((year, i) => {
          return (
            <Box
              //the specificity locks these elements to the defined grid;
              //prevents them from being pushed around
              //now you can overlay anything over them
              className="year-borders"
              w="1px"
              borderLeft="1px solid #828282"
              zIndex="0"
              gridColumn={`${12 * i + 1} / span 12`}
              gridRow="1 / span 6 "
              key={`${year}border`}
              position="relative"
            />
          );
        })}
      </Grid>
      <EventsYearsBorder />
      <Grid id="years-container" gridTemplateColumns={gridTemplateColumns}>
        {years.map((year) => (
          <Flex flexDir="column" gridColumn="span 12" key={year}>
            <Box
              as="span"
              className="circle"
              position="relative"
              bgColor="#C4C4C4"
              width="14px"
              height="14px"
              borderRadius="50%"
              ml="0.5px" //value of the black left border between each year
              transform="translateY(-50%) translateX(-50%)"
            ></Box>
            <Box
              width="fit-content"
              transform="translateX(calc(-50% + 7px))"
              as="span"
              key={year}
            >
              {year}
            </Box>
          </Flex>
        ))}
      </Grid>
    </Grid>
  );
};

const EventsYearsBorder = () => {
  return (
    <Box
      width="0"
      pos="fixed"
      id="events-years-border"
      borderBottom="1px solid black"
      h="1px"
      transition="width .1s ease-in-out"
    />
  );
};

export default timeline;
