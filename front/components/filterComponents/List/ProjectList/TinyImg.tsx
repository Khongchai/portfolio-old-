import { Box } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";
import {
  RunningBordersBT,
  RunningBordersLR,
} from "../../../animation/RunningBorders";

interface TinyImgProps {
  tinyImgLink: Maybe<string> | null;
  projTitle: string;
}

export const TinyImg: React.FC<TinyImgProps> = ({ tinyImgLink, projTitle }) => {
  const sideLength = "170px";

  return (
    <>
      <Box
        minHeight={sideLength}
        minWidth={sideLength}
        width={sideLength}
        height={sideLength}
        margin={2}
        bgColor="black"
        backgroundImage={tinyImgLink ? `url(${tinyImgLink})` : ""}
        backgroundPosition="center"
        backgroundRepeat="none"
        backgroundSize="cover"
        className={projTitle + "tiny-img"}
        position="relative"
      >
        <RunningBordersLR>
          <RunningBordersBT />
        </RunningBordersLR>
      </Box>
    </>
  );
};
