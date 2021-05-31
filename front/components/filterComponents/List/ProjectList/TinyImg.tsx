import { Box } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import {
  RunningBordersBT,
  RunningBordersLR,
} from "../../../animation/RunningBorders";

interface TinyImgProps {
  tinyImgLink: Maybe<string> | null;
}

export const TinyImg: React.FC<TinyImgProps> = ({ tinyImgLink }) => {
  const sideLength = "170px";

  return (
    <>
      <Box
        minHeight={sideLength}
        minWidth={sideLength}
        width={sideLength}
        height={sideLength}
        margin={2}
        bgColor="mainGrey"
        backgroundImage={tinyImgLink ? `url(${tinyImgLink})` : ""}
        backgroundPosition="center"
        backgroundRepeat="none"
        backgroundSize="cover"
        position="relative"
      >
        <RunningBordersLR>
          <RunningBordersBT />
        </RunningBordersLR>
      </Box>
    </>
  );
};
