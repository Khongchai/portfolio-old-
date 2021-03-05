import { Box, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import InfoDisplay from "../../components/filterComponents/InfoDisplay/index";
import List from "../../components/filterComponents/List";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";
import { GetServerSideProps } from "next";
import setPadding from "../../utils/seFirstHeightToSecondPadding";
import {
  SearchAndFind,
  SearchAndFindForMobile,
} from "../../components/filterComponents/SearchAndFilterBoxes";
import { AddExtraElemContext } from "../../globalContexts/extraNavbarElem";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  //setVariables for pagination
  const [variables, setVariables] = useState({
    skip: 0,
    limit: 5,
  });
  const updateTopics = useContext(AddExtraElemContext);
  const [{ data }] = useProjectsQuery({ variables });
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);

  useEffect(() => {
    const filterPage = document.getElementById("filter-page");
    const navbar = document.getElementById("navbar");
    if (filterPage && navbar) {
      setPadding(navbar, filterPage, 2);
    }
    updateTopics(<SearchAndFindForMobile />);
    return () => updateTopics(null);
  }, []);

  function paginateForward() {
    setVariables({
      limit: variables.limit,
      skip: variables.skip + variables.limit,
    });
  }

  function paginateBackWard() {
    setVariables({
      limit: variables.limit,
      skip: variables.skip - variables.limit,
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
      <SearchAndFind />
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
