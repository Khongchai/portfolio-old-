import { Box } from "@chakra-ui/react";
import React from "react";

const EventsYearsBorder: React.FC = () => {
  return (
    <Box
      width="0"
      pos="fixed"
      id="events-years-border"
      borderBottom="1px solid black"
      h="1px"
      transition="width .1s ease-in-out"
    />
  );
};

export default EventsYearsBorder;
