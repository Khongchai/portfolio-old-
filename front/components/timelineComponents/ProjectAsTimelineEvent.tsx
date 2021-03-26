import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../generated/graphql";
import { GridRowPos } from "../../types/GridRowPos";
import { getGridColumnLength } from "../../utils/timeline/getGridColumnLength";
import { getGridRow } from "../../utils/timeline/getGridRow";

const ProjectAsTimelineEvent: React.FC<{
  proj: ProjectEntity;
  index: number;
  firstYearInTimeline: number;
  gridRowPos: GridRowPos;
}> = ({ firstYearInTimeline, index, proj, gridRowPos }) => {
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

  return (
    <>
      <Box
        gridRow={`${gridRow} / events-container-bottom`}
        gridColumn={gridColumnBeginPosition}
        width="1px"
        bgColor="#828282"
      ></Box>
      <Grid
        className="project-event"
        bgColor="#858294"
        zIndex="1"
        gridColumn={`${gridColumnBeginPosition} / span ${gridColumnLength}`}
        gridRow={gridRow}
        placeItems={"center"}
        borderRadius="0 8px 8px 0"
        textOverflow="ellipsis"
        overflow="hidden"
        justifyContent="center"
        fontSize="0.9rem"
        whiteSpace="nowrap"
        p="0.1em 0.3em 0.1em 0.3em"
      >
        <Text className="project-event-title">{proj.title}</Text>
      </Grid>
    </>
  );
};

export default ProjectAsTimelineEvent;
