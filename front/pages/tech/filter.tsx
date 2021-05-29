import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import InfoDisplay from "../../components/filterComponents/InfoDisplay/index";
import List from "../../components/filterComponents/List";
import { SearchAndFindWrapper } from "../../components/filterComponents/SearchAndFilterBoxes";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";
import { AddExtraElemContext } from "../../globalContexts/extraNavbarElem";
import setPadding from "../../utils/generics/setFirstHeightToSecondPadding";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  const [searchParams, setSearchParams] = useState<{
    search: string | undefined;
    sortBy: "Title" | "Date" | undefined;
    order: "ASC" | "DESC" | undefined;
    //"Projects" = search by projects, "Technologies" = search by Technologies used
    field: "Title" | "Technology" | undefined;
  }>({
    search: undefined,
    sortBy: "Date",
    order: "ASC",
    field: "Title",
  });

  const [queryVariables, setQueryVariables] = useState({
    skip: 0,
    limit: 5,
    //initial value is the searchParams' initial value
    ...searchParams,
  });

  const updateTopics = useContext(AddExtraElemContext);
  let [{ data, fetching }] = useProjectsQuery({ variables: queryVariables });
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);

  useEffect(() => {
    const filterPage = document.getElementById("filter-page");
    const navbar = document.getElementById("navbar");
    if (filterPage && navbar) {
      setPadding(navbar, filterPage, 2);
    }
  }, []);

  useEffect(() => {
    updateTopics({
      mobile: (
        <SearchAndFindWrapper
          mode="mobile"
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      ),
      desktop: (
        <SearchAndFindWrapper
          mode="desktop"
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      ),
    });
    return () => updateTopics(undefined);
  }, [searchParams]);

  useEffect(() => {
    {
      setQueryVariables({
        skip: queryVariables.skip,
        limit: queryVariables.limit,
        ...searchParams,
      });
    }
  }, [searchParams]);

  function paginateForward() {
    setQueryVariables({
      limit: queryVariables.limit,
      skip: queryVariables.skip + queryVariables.limit,
      order: queryVariables.order,
      sortBy: queryVariables.sortBy,
      search: queryVariables.search,
      field: queryVariables.field,
    });
  }

  function paginateBackward() {
    setQueryVariables({
      ...queryVariables,
      skip: queryVariables.skip - queryVariables.limit,
    });
  }
  // function paginateBackWard() {
  //   setQueryVariables({
  //     limit: queryVariables.limit,
  //     skip: queryVariables.skip - queryVariables.limit,
  //     order: queryVariables.order,
  //     sortBy: queryVariables.sortBy,
  //     search: queryVariables.search,
  //     field: queryVariables.field,
  //   });
  // }

  return (
    <Flex
      id="filter-page"
      flexDir={["column", "column", "column", "column", "row", "row"]}
      w={"100%"}
      h={["auto", null, "max(100vh, 1000px)"]}
      pb="1.5rem"
      className="filter-page-container"
    >
      <InfoDisplay details={details} />
      <List
        searchFetching={fetching}
        data={data}
        details={details}
        selection={selection}
        setDetails={setDetails}
        paginateForward={paginateForward}
        paginateBackward={paginateBackward}
      />
    </Flex>
  );
};

export default Filter;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedQuery = context.query;
  const { selection } = parsedQuery;
  return {
    props: {
      selection: selection || null,
    },
  };
};
