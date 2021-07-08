import { Flex, Input, Select, Text } from "@chakra-ui/react";
import React from "react";

type orderType = "ASC" | "DESC" | undefined;
type sortType = "Title" | "Date" | undefined;

interface searchQueryParams {
  searchParams: searchParams;
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      search: string | undefined;
      sortBy: sortType;
      order: orderType;
    }>
  >;
  mode: "desktop" | "mobile";
}
interface searchParams {
  search: string | undefined;
  sortBy: sortType;
  order: orderType;
}

export const SearchAndFindWrapper: React.FC<searchQueryParams> = ({
  searchParams,
  setSearchParams,
  mode,
}) => {
  function setSearch(value: string) {
    setSearchParams({
      ...searchParams,
      search: value,
    });
  }

  function setOrder(value: orderType) {
    setSearchParams({
      ...searchParams,
      order: value,
    });
  }

  function setSort(value: sortType) {
    setSearchParams({
      ...searchParams,
      sortBy: value,
    });
  }

  return (
    <>
      {mode === "desktop" ? (
        <SearchAndFindDesktop
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
          searchParams={searchParams}
        />
      ) : (
        <SearchAndFindForMobile
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
          searchParams={searchParams}
        />
      )}
    </>
  );
};

interface setFunctions {
  setSearch: (value: string) => void;
  setSort: (value: sortType) => void;
  setOrder: (value: orderType) => void;
  searchParams: searchParams;
}

const SearchAndFindDesktop: React.FC<setFunctions> = ({
  setOrder,
  setSort,
  setSearch,
}) => {
  return (
    <Flex
      id="navbar"
      top="0"
      right="0"
      ml="auto"
      width="100%"
      justify="flex-end"
      align="center"
      display={["none", null, null, "flex"]}
      css={{
        "> *": {
          marginLeft: "1em",
        },
      }}
    >
      <Input
        placeholder={`Search Any`}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        width={"10em"}
        border="none"
        bgColor="black3"
      />

      {/* Determines the order in which the search queries gets returned. */}
      <Select
        onChange={(e) => {
          setSort(e.target.value as any);
        }}
        border="none"
        bgColor="black3"
        color="grey3"
        w="fit-content"
      >
        <option value="Date">Date</option>
        <option value="Title">Title</option>
      </Select>
      <Select
        onChange={(e) => {
          setOrder(e.target.value as any);
        }}
        color="grey3"
        w="fit-content"
        border="none"
        bgColor="black3"
      >
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </Select>
    </Flex>
  );
};

const SearchAndFindForMobile: React.FC<setFunctions> = ({
  setOrder,
  setSearch,
  setSort,
}) => {
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
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={`Search Any`}
        width={"100%"}
      />
      {/* Determines the order in which the search queries gets returned. */}
      <Text>Sort</Text>
      <Select
        width={"100%"}
        onChange={(e) => {
          setSort(e.target.value as any);
        }}
        color="grey3"
        w="fit-content"
      >
        <option value="Date">Date</option>
        <option value="Title">Title</option>
      </Select>
      <Select
        width={"100%"}
        onChange={(e) => {
          setOrder(e.target.value as any);
        }}
        color="grey3"
        w="fit-content"
      >
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </Select>
    </Flex>
  );
};
