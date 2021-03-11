import { Flex, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type orderType = "ASC" | "DESC" | undefined;
type sortType = "Title" | "Date" | undefined;
type fieldType = "Title" | "Technologies" | undefined;

interface searchQueryParams {
  searchParams: {
    search: string | undefined;
    sortBy: sortType;
    order: orderType;
    field: fieldType;
  };
  setSearchParams: React.Dispatch<
    React.SetStateAction<{
      search: string | undefined;
      sortBy: sortType;
      order: orderType;
      field: fieldType;
    }>
  >;
  mode: "desktop" | "mobile";
}

export const SearchAndFindWrapper: React.FC<searchQueryParams> = ({
  searchParams,
  setSearchParams,
  mode,
}) => {
  function setSearch(value: string) {
    setSearchParams({
      order: searchParams.order,
      sortBy: searchParams.sortBy,
      search: value,
      field: searchParams.field,
    });
  }

  function setOrder(value: orderType) {
    setSearchParams({
      order: value,
      sortBy: searchParams.sortBy,
      search: searchParams.search,
      field: searchParams.field,
    });
  }

  function setSort(value: sortType) {
    setSearchParams({
      order: searchParams.order,
      sortBy: value,
      search: searchParams.search,
      field: searchParams.field,
    });
  }

  function setField(value: fieldType) {
    setSearchParams({
      order: searchParams.order,
      sortBy: searchParams.sortBy,
      search: searchParams.search,
      field: value,
    });
  }

  return (
    <>
      {mode === "desktop" ? (
        <SearchAndFind
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
          setField={setField}
        />
      ) : (
        <SearchAndFindForMobile
          setSearch={setSearch}
          setSort={setSort}
          setOrder={setOrder}
          setField={setField}
        />
      )}
    </>
  );
};

interface setFunctions {
  setSearch: (value: string) => void;
  setSort: (value: sortType) => void;
  setOrder: (value: orderType) => void;
  setField: (value: fieldType) => void;
}

const SearchAndFind: React.FC<setFunctions> = ({
  setOrder,
  setSort,
  setSearch,
  setField,
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
      <Select
        onChange={(e) => {
          setField(e.target.value as any);
        }}
        border="none"
        bgColor="#636073"
        color="grey3"
        w="fit-content"
      >
        <option value="Title">Title</option>
        <option value="Technologies">Technology</option>
      </Select>
      <Input
        placeholder="Search by technologies name"
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
          setSort(e.target.value as any);
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
          setOrder(e.target.value as any);
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
  setField,
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
      <Select
        onChange={(e) => {
          setField(e.target.value as any);
        }}
        color="grey3"
        w="fit-content"
      >
        <option value="Title">Title</option>
        <option value="Technologies">Technology</option>
      </Select>
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search by title"
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
