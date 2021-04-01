import { Box, Grid, Text, Flex, transition } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { GridRowPos } from "../../../types/GridRowPos";
import { getGridColumnLength } from "../../../utils/timeline/getGridColumnLength";
import { getGridRow } from "../../../utils/timeline/getGridRow";
import {
  getExtraDayOffset,
  setProjectAndIndicatorFocusColor,
  revealTitleIfWidthLessThanTitle,
  removeProjectAndIndicatorFocusColor,
  resetWidthIfWidthNotOriginal,
  setElementAsFocused,
} from "../../../utils/timeline/projectTimelineAsEventUtils";

const ProjectAsTimelineEvent: React.FC<{
  proj: ProjectEntity;
  firstYearInTimeline: number;
  gridRowPos: GridRowPos;
  oneMonthLengthInPixels: string;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
}> = ({
  firstYearInTimeline,
  oneMonthLengthInPixels,
  proj,
  gridRowPos,
  setSelectedProject,
}) => {
  const transitionTime = ".2s";

  const projectEndDate = {
    month: parseInt(proj.endDate?.split("-")[1]),
    year: parseInt(proj.endDate?.split("-")[0]),
  };
  const projectBeginDate = {
    month: parseInt(proj.startDate.split("-")[1]),
    year: parseInt(proj.startDate.split("-")[0]),
  };
  const projectStartYear = parseInt(proj?.startDate.split("-")[0]);
  const numberOfMonths = 12;
  const firstColumnPosition = 1;
  const gridColumnBeginPosition =
    (projectStartYear - firstYearInTimeline) * numberOfMonths +
    firstColumnPosition +
    projectBeginDate.month;
  const gridColumnLength = getGridColumnLength(
    projectBeginDate,
    projectEndDate
  );
  const gridRow = getGridRow(
    gridColumnBeginPosition,
    gridColumnBeginPosition + gridColumnLength,
    gridRowPos
  );

  const projectBeginDay = parseInt(proj.startDate.split("-")[2]);
  const extraDayOffsetInPixels = getExtraDayOffset(
    projectBeginDay,
    oneMonthLengthInPixels
  );

  const projIdAsString = `${proj.id}`;

  return (
    <>
      <Box
        gridRow={`${gridRow} / events-container-bottom`}
        gridColumn={gridColumnBeginPosition}
        width="1px"
        transform={`translateX(${extraDayOffsetInPixels})`}
        bgColor="#828282"
        transition={`background-color ${transitionTime}, width ${transitionTime}`}
        className="project-event-time-indicator"
        id={`${projIdAsString}-time-indicator`}
      />
      <Flex
        id={projIdAsString}
        transition={`background-color ${transitionTime}, width ${transitionTime}`}
        className="project-event"
        bgColor="#858294"
        onMouseOver={() => {
          setProjectAndIndicatorFocusColor(projIdAsString);
          revealTitleIfWidthLessThanTitle(projIdAsString);
        }}
        onMouseOut={() => {
          removeProjectAndIndicatorFocusColor(projIdAsString);
          resetWidthIfWidthNotOriginal(projIdAsString);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedProject(proj);
          setElementAsFocused(
            projIdAsString,
            `${projIdAsString}-time-indicator`
          );
        }}
        zIndex="2"
        transform={`translateX(${extraDayOffsetInPixels})`}
        gridColumn={`${gridColumnBeginPosition} / span ${gridColumnLength}`}
        gridRow={gridRow}
        placeItems={"center"}
        borderRadius="0 8px 8px 0"
        overflow="hidden"
        fontSize="0.9rem"
        p="0.1em 0.3em 0.1em 1em"
        cursor="pointer"
      >
        <Text
          pointerEvents="none"
          className="project-event-title"
          id={`${projIdAsString}-title`}
        >
          {proj.title}
        </Text>
      </Flex>
    </>
  );
};

export default ProjectAsTimelineEvent;
