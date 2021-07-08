import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { GridRowPos } from "../../../types/GridRowPos";
import { setToLocalStorageAndSelectedState } from "../../../utils/navigation/setAndGetCurrentSelection/setToLocalStorageAndSelectedState";
import { getGridColumnLength } from "../../../utils/timeline/getGridColumnLength";
import { getGridRow } from "../../../utils/timeline/getGridRow";
import {
  getExtraDayOffset,
  resetWidthIfWidthNotOriginal,
  revealTitleIfWidthLessThanTitle,
} from "../../../utils/timeline/projectsAsEvents/misc";
import {
  removeProjectAndIndicatorFocusColor,
  setProjectAndIndicatorFocusColor,
} from "../../../utils/timeline/projectsAsEvents/setFocusOnHover";

const ProjectAsTimelineEvent: React.FC<{
  proj: ProjectEntity;
  firstYearInTimeline: number;
  gridRowPos: GridRowPos;
  oneMonthLengthInPixels: string;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
  setLastEventRendered: React.Dispatch<React.SetStateAction<boolean>>;
  isLastProj: boolean;
}> = ({
  firstYearInTimeline,
  oneMonthLengthInPixels,
  proj,
  gridRowPos,
  setSelectedProject,
  setLastEventRendered,
  isLastProj,
}) => {
  const transitionTime = ".2s";

  useEffect(() => {
    if (isLastProj) {
      setLastEventRendered(true);
    }
  }, []);

  const projectEndDate = {
    month: parseInt(proj.endDate?.split("-")[1] as any),
    year: parseInt(proj.endDate?.split("-")[0] as any),
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
        bgColor="black3"
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
          setToLocalStorageAndSelectedState(proj, setSelectedProject as any);
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
