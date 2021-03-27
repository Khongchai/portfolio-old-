import { Box, Grid, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ProjectEntity } from "../../generated/graphql";
import { GridRowPos } from "../../types/GridRowPos";
import { getGridColumnLength } from "../../utils/timeline/getGridColumnLength";
import { getGridRow } from "../../utils/timeline/getGridRow";

const ProjectAsTimelineEvent: React.FC<{
  proj: ProjectEntity;
  index: number;
  firstYearInTimeline: number;
  gridRowPos: GridRowPos;
  oneMonthLengthInPixels: string;
}> = ({
  firstYearInTimeline,
  oneMonthLengthInPixels,
  index,
  proj,
  gridRowPos,
}) => {
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

  return (
    <>
      <Box
        gridRow={`${gridRow} / events-container-bottom`}
        gridColumn={gridColumnBeginPosition}
        width="1px"
        transform={`translateX(${extraDayOffsetInPixels})`}
        bgColor="#828282"
      ></Box>
      <Grid
        className="project-event"
        bgColor="#858294"
        zIndex="2"
        _hover={{ backgroundColor: "#FA9D55" }}
        transform={`translateX(${extraDayOffsetInPixels})`}
        gridColumn={`${gridColumnBeginPosition} / span ${gridColumnLength}`}
        gridRow={gridRow}
        placeItems={"center"}
        borderRadius="0 8px 8px 0"
        overflow="hidden"
        justifyContent="center"
        fontSize="0.9rem"
        p="0.1em 0.3em 0.1em 0.3em"
      >
        <Text className="project-event-title">{proj.title}</Text>
      </Grid>
    </>
  );
};

function getExtraDayOffset(
  projectBeginDay: number,
  oneMonthLengthInPixel: string
) {
  //assume all month has 31 days for simplicity sake.
  const daysInMonth = 31;
  const offsetRight =
    (parseInt(oneMonthLengthInPixel) * projectBeginDay) / daysInMonth;
  return `${Math.floor(offsetRight)}px`;
}

function setToFocusColor() {
  //TODO
}

export default ProjectAsTimelineEvent;
