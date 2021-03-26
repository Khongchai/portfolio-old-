import { GridRowPos } from "../../types/GridRowPos";

export function getGridRow(
  beginVal: number,
  endVal: number,
  gridRowPos: GridRowPos
): number {
  let row: number = 1;
  if (beginVal > gridRowPos.first) {
    gridRowPos.first = endVal;
    row = 1;
  } else if (beginVal > gridRowPos.second) {
    gridRowPos.second = endVal;
    row = 2;
  } else if (beginVal > gridRowPos.third) {
    gridRowPos.third = endVal;
    row = 3;
  } else {
    gridRowPos.fourth = endVal;
    row = 4;
  }
  return row;
}
