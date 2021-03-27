import { Text, Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AllProjectsNotPaginatedQuery } from "../../generated/graphql";
import ProjectAsTimelineEvent from "./ProjectAsTimelineEvent";
import setEventsYearsBorderPosition from "../../utils/timeline/setEventsYearsBorderPosition";
import EventsYearsBorder from "./EventsYearsBorder";
import setScrollPositionTo2019 from "../../utils/timeline/setScrollPositionTo2019";
import Years from "./Years";
import manageBlockMove from "../../utils/timeline/manageBlockMove/manageBlockMove";

interface timelineProps {
  years: number[];
  data: AllProjectsNotPaginatedQuery | undefined;
}

export const Timeline: React.FC<timelineProps> = ({ years, data }) => {
  const gridRowPos = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  const oneMonthLengthInPixels = "55px";
  const twelveMonths = 12;
  const gridTemplateColumns = `repeat(${
    years.length * twelveMonths
  }, ${oneMonthLengthInPixels})`;

  useEffect(() => {
    setEventsYearsBorderPosition();
  }, []);

  useEffect(() => {
    manageBlockMove("timeline", "monitor");
    return () => {
      manageBlockMove("timeline", "de-monitor");
    };
  }, []);

  useLayoutEffect(() => {
    const timeline = document.getElementById("timeline");
    const year2019Element = document.getElementById("year-2019-element");
    if (timeline && year2019Element) {
      setScrollPositionTo2019(year2019Element, timeline);
    }
  });

  return (
    <>
      <EventsYearsBorder />
      <Grid
        id="timeline"
        gridTemplateRows="[timeline-top] 0.78fr [timeline-bottom] 0.22fr [timeline-padding-bottom]"
      >
        <Grid
          id="events-container"
          gridRow="timeline-top / timeline-bottom"
          flexDir="row"
          rowGap="1.3em"
          gridTemplateColumns={gridTemplateColumns}
          //number of row is arbitrary (as long as there is enough)
          gridTemplateRows="[events-container-top] 1fr 1fr 1fr 1fr [events-container-bottom]"
        >
          {data?.allProjectsNotPaginated.map((proj, i) => {
            return (
              <ProjectAsTimelineEvent
                key={proj.title}
                proj={proj}
                index={i}
                oneMonthLengthInPixels={oneMonthLengthInPixels}
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
                gridRow="1 / span 4 "
                key={`${year}border`}
                position="relative"
              />
            );
          })}
        </Grid>
        <Grid id="years-container" gridTemplateColumns={gridTemplateColumns}>
          <Years years={years} />
        </Grid>
      </Grid>
    </>
  );
};

export default Timeline;
