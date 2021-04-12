import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import {
  AllProjectsNotPaginatedQuery,
  ProjectEntity,
} from "../../../generated/graphql";
import manageBlockMove from "../../../utils/timeline/manageBlockMove/manageBlockMove";
import setFocusOnChange from "../../../utils/timeline/projectsAsEvents/setFocusOnChange";
import setEventsYearsBorderPosition from "../../../utils/timeline/setEventsYearsBorderPosition";
import setScrollPositionToYearX from "../../../utils/timeline/setScrollPositionToYearX";
import Years from "../Years";
import EventsYearsBorder from "./EventsYearsBorder";
import ProjectAsTimelineEvent from "./ProjectAsTimelineEvent";

interface timelineProps {
  years: number[];
  data: AllProjectsNotPaginatedQuery | undefined;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
  selectedProject: ProjectEntity | null;
}

export const Timeline: React.FC<timelineProps> = ({
  years,
  data,
  setSelectedProject,
  selectedProject,
}) => {
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
  const yearElemToSetInitialScrollToRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setEventsYearsBorderPosition();
  }, []);

  useEffect(() => {
    manageBlockMove("timeline", "monitor");
    return () => {
      manageBlockMove("timeline", "de-monitor");
    };
  }, []);

  //use useState and set the state as true when the last elements of the projectEvent finished loading.
  //when true, run this focusOnChange
  //this is for loading the currently selected event when loading value from get query
  useEffect(() => {
    setFocusOnChange(
      String(selectedProject?.id),
      `${selectedProject?.id}-time-indicator`
    );
  }, [selectedProject]);

  useEffect(() => {
    const timeline = document.getElementById("timeline");
    if (timeline && yearElemToSetInitialScrollToRef.current !== null) {
      setScrollPositionToYearX(
        yearElemToSetInitialScrollToRef.current,
        timeline
      );
    }
  }, [yearElemToSetInitialScrollToRef.current]);

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
                setSelectedProject={setSelectedProject}
                key={proj.title}
                proj={proj}
                oneMonthLengthInPixels={oneMonthLengthInPixels}
                firstYearInTimeline={years[0]}
                gridRowPos={gridRowPos}
              />
            );
          })}

          {years.map((year: number, i) => {
            return (
              <Box
                //the specificity locks these elements to the defined grid;
                //prevents them from being pushed around
                //now you can overlay anything over them
                ref={
                  year === 2019
                    ? yearElemToSetInitialScrollToRef
                    : (null as any)
                }
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
