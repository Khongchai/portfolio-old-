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
      visibility={["hidden", null, "visible"]}
      css={{
        "> *": {
          marginLeft: "1em",
        },
      }}
    >
      <Input placeholder="Search by title" width={"20em"}></Input>
      {/* Determines the order in which the search queries gets returned. */}
      <Text>Sort</Text>
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

export const SearchAndFindForMobile: React.FC<{}> = ({}) => {
  return (
    <Flex
      id="navbar"
      top="0"
      flexDir="column"
      right="0"
      p="1.3em 0.2em 1.3em 0.2em"
      width="100%"
      justify="flex-end"
      css={{
        "> *": {
          marginTop: "1em",
        },
      }}
    >
      <Input placeholder="Search by title" width={"100%"}></Input>
      {/* Determines the order in which the search queries gets returned. */}
      <Text>Sort</Text>
      <Select width={"100%"} color="grey3" w="fit-content">
        <option value="Date">Date</option>
        <option value="Title">Title</option>
      </Select>
      <Select width={"100%"} color="grey3" w="fit-content">
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </Select>
    </Flex>
  );
};
