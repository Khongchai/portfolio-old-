import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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

  const [lastEventRendered, setLastEventRendered] = useState<boolean>(false);
  const oneMonthLengthInPixels = "55px";
  const twelveMonths = 12;
  const gridTemplateColumns = `repeat(${
    years.length * twelveMonths
  }, ${oneMonthLengthInPixels})`;
  const yearElemToSetInitialScrollToRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setEventsYearsBorderPosition();
    //Debug: loads too fast and the position is wrong, load too slow causes delay
    //possible fix: delayed load only the first time.
    window.addEventListener("scroll", setEventsYearsBorderPosition);
    return () => {
      window.removeEventListener("scroll", setEventsYearsBorderPosition);
    };
  }, []);

  useEffect(() => {
    //Dear my future self
    //Why not just use GSAP, you may ask?
    //Gsap was not working properly and I couldn't figure out why
    //So I wrote the move function myself.
    //Turns out, it was the god damn css transition...
    //This took you 1 whole fucking day.
    manageBlockMove("timeline", "monitor");
    return () => {
      manageBlockMove("timeline", "de-monitor");
    };
  }, []);

  useEffect(() => {
    if (lastEventRendered) {
      setFocusOnChange(
        String(selectedProject?.id),
        `${selectedProject?.id}-time-indicator`
      );
    }
  }, [lastEventRendered, selectedProject]);

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
                setLastEventRendered={setLastEventRendered}
                setSelectedProject={setSelectedProject}
                proj={proj}
                isLastProj={
                  data.allProjectsNotPaginated.length - 1 === i ? true : false
                }
                oneMonthLengthInPixels={oneMonthLengthInPixels}
                firstYearInTimeline={years[0]}
                gridRowPos={gridRowPos}
                key={proj.title}
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
