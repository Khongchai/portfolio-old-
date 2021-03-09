import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import InfoDisplay from "../../components/filterComponents/InfoDisplay/index";
import List from "../../components/filterComponents/List";
import { SearchAndFindWrapper } from "../../components/filterComponents/SearchAndFilterBoxes";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";
import { AddExtraElemContext } from "../../globalContexts/extraNavbarElem";
import setPadding from "../../utils/setFirstHeightToSecondPadding";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  const [searchParams, setSearchParams] = useState<{
    search: string | undefined;
    sortBy: string | undefined;
    order: string | undefined;
  }>({
    search: undefined,
    sortBy: "Date",
    order: "ASC",
  });

  const [queryVariables, setQueryVariables] = useState({
    skip: 0,
    limit: 5,
    //initial value is the searchParams' initial value
    ...searchParams,
  });
  const updateTopics = useContext(AddExtraElemContext);
  const [{ data }] = useProjectsQuery({ variables: queryVariables });
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);

  useEffect(() => {
    const filterPage = document.getElementById("filter-page");
    const navbar = document.getElementById("navbar");
    if (filterPage && navbar) {
      setPadding(navbar, filterPage, 2);
    }
    updateTopics(
      <SearchAndFindWrapper
        mode="mobile"
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    );
    return () => updateTopics(undefined);
  }, []);

  useEffect(() => {
    setQueryVariables({
      skip: queryVariables.skip,
      limit: queryVariables.limit,
      ...searchParams,
    });
  }, [searchParams]);

  function paginateForward() {
    setQueryVariables({
      limit: queryVariables.limit,
      skip: queryVariables.skip + queryVariables.limit,
      order: queryVariables.order,
      sortBy: queryVariables.sortBy,
      search: queryVariables.search,
    });
  }

  function paginateBackWard() {
    setQueryVariables({
      limit: queryVariables.limit,
      skip: queryVariables.skip - queryVariables.limit,
      order: queryVariables.order,
      sortBy: queryVariables.sortBy,
      search: queryVariables.search,
    });
  }

  return (
    <Flex
      id="filter-page"
      flexDir={["column", "column", "column", "column", "row", "row"]}
      w={"100%"}
      h={["auto", null, "100vh"]}
      pb="1.5rem"
    >
      <SearchAndFindWrapper
        mode="desktop"
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      <InfoDisplay details={details} />
      <List
        data={data}
        details={details}
        selection={selection}
        setDetails={setDetails}
        paginateForward={paginateForward}
        paginateBackward={paginateBackWard}
      />
    </Flex>
  );
};
/*
pagination
      <Box
        onClick={() => {
          setVariables({
            limit: variables.limit,
            skip: variables.skip + variables.limit,
          });
        }}
      >
        load more
      </Box>
*/

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
