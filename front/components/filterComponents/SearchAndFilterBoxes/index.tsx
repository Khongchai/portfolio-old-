import { Flex, Input, Select, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

export const SearchAndFind: React.FC<{}> = ({}) => {
  useEffect(() => {
    //set Height to be equal to the navbar
  }, []);
  return (
    <Flex
      id="navbar"
      position="absolute"
      top="0"
      right="0"
      p="1.3em 3em 1.3em 3em"
      width="50%"
      justify="flex-end"
      align="center"
      css={{
        "> *": {
          marginLeft: "1em",
        },
      }}
    >
      <Input placeholder="Search" width={"20em"}></Input>
      {/* Determines the order in which the search queries gets returned. */}
      <Select color="grey3" w="fit-content">
        <option value="Date">Date</option>
        <option value="Title">Title</option>
      </Select>
      <Select color="grey3" w="fit-content">
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </Select>
    </Flex>
  );
};

export default SearchAndFind;
