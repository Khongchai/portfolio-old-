import { Box } from "@chakra-ui/react";
import { Maybe } from "graphql/jsutils/Maybe";
import React from "react";

interface TinyImgProps {
  tinyImgLink: Maybe<string> | null;
}

export const TinyImg: React.FC<TinyImgProps> = ({ tinyImgLink }) => {
  const sideLength = "170px";

  return (
    <Box
      minHeight={sideLength}
      minWidth={sideLength}
      margin={2}
      bgColor="mainGrey"
      borderRadius="22px"
      backgroundImage={tinyImgLink ? `url(${tinyImgLink})` : ""}
      backgroundPosition="center"
      backgroundRepeat="none"
      backgroundSize="cover"
    />
  );
};
