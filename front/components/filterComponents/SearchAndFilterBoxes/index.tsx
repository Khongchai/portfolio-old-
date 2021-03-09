import { Flex, Input, Select, Text } from "@chakra-ui/react";
import React from "react";

interface searchQueryParams {
  searchParams: {
    search: string | undefined;
    sortBy: string | undefined;
    order: string | undefined;
  };
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      search: string | undefined;
      sortBy: string | undefined;
      order: string | undefined;
    }>
  >;
  mode: "desktop" | "mobile";
}

export const SearchAndFindWrapper: React.FC<searchQueryParams> = ({
  searchParams,
  setSearchParams,
  mode,
}) => {
  /* 
  useEffect(() => {
    console.log("searchParams", searchParams);
  }, [searchParams]);
*/
  function setSearch(value: string) {
    setSearchParams({
      order: searchParams.order,
      sortBy: searchParams.sortBy,
      search: value,
    });
  }

  function setOrder(value: string) {
    setSearchParams({
      order: value,
      sortBy: searchParams.sortBy,
      search: searchParams.search,
    });
  }

  function setSort(value: string) {
    setSearchParams({
      order: searchParams.order,
      sortBy: value,
      search: searchParams.search,
    });
  }

  return (
    <>
      {mode === "desktop" ? (
        <SearchAndFind
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
        />
      ) : (
        <SearchAndFindForMobile
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
        />
      )}
    </>
  );
};

interface setFunctions {
  setSearch: (value: string) => void;
  setSort: (value: string) => void;
  setOrder: (value: string) => void;
}

const SearchAndFind: React.FC<setFunctions> = ({
  setOrder,
  setSort,
  setSearch,
}) => {
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
      <Input
        placeholder={'Search: "Django" "React" etc.'}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        width={"20em"}
        border="none"
        bgColor="#636073"
      />

      {/* Determines the order in which the search queries gets returned. */}
      <Text>Sort</Text>
      <Select
        onChange={(e) => {
          setSort(e.target.value);
        }}
        border="none"
        bgColor="#636073"
        color="grey3"
        w="fit-content"
      >
        <option value="Date">Date</option>
        <option value="Title">Title</option>
      </Select>
      <Select
        onChange={(e) => {
          setOrder(e.target.value);
        }}
        color="grey3"
        w="fit-content"
        border="none"
        bgColor="#636073"
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
        placeholder="Search by title"
        width={"100%"}
      ></Input>
      {/* Determines the order in which the search queries gets returned. */}
      <Text>Sort</Text>
      <Select
        width={"100%"}
        onChange={(e) => {
          setSort(e.target.value);
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
          setOrder(e.target.value);
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
