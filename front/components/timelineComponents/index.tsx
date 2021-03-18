import { Box, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import setEventsYearsBorderPosition from "../../utils/timeline/setEventsYearsBorderPosition";

interface indexProps {
  years: number[];
}

export const index: React.FC<indexProps> = ({ years }) => {
  setEventsYearsBorderPosition();
  //TO BE IMPLEMENTED
  //setScrollPositionTo2019() <--first year of coding
  //manageTimelineScroll
  const gridTemplateColumns = `repeat(${years.length}, 430px)`;
  return (
    <Grid gridTemplateRows="[timeline-top] 0.78fr [timeline-bottom] 0.22fr [timeline-padding-bottom]">
      <Grid
        events-container
        gridRow="timeline-top / timeline-bottom"
        flexDir="row"
        gridTemplateColumns={gridTemplateColumns}
      ></Grid>
      <EventsYearsBorder />
      <Grid id="years-container" gridTemplateColumns={gridTemplateColumns}>
        {years.map((year) => (
          <Flex flexDir="column" grid key={year}>
            <Box
              as="span"
              className="circle"
              position="relative"
              bgColor="#C4C4C4"
              borderRadius="50%"
              width="14px"
              height="14px"
              transform="translateY(-50%)"
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

export default index;
