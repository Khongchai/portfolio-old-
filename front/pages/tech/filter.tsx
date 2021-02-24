import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfoDisplay from "../../components/filterComponents/InfoDisplay/index";
import List from "../../components/filterComponents/List/index";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";
import { GetServerSideProps } from "next";
import setPadding from "../../utils/seFirstHeightToSecondPadding";
import SearchAndFind from "../../components/filterComponents/SearchAndFilterBoxes";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  const [{ data, fetching }] = useProjectsQuery();
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);
  //todo, show universal loading screen while loading
  useEffect(() => {
    const filterPage = document.getElementById("filter-page");
    const navbar = document.getElementById("navbar");
    if (filterPage && navbar) {
      setPadding(navbar, filterPage, 2);
    }
  }, []);

  return (
    <Flex
      id="filter-page"
      flexDir={["column", "column", "column", "column", "row", "row"]}
      w={"100%"}
      h={["auto", null, "100vh"]}
    >
      {fetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <SearchAndFind />
          <InfoDisplay details={details} />
          <List
            data={data}
            details={details}
            selection={selection}
            setDetails={setDetails}
          />
        </>
      )}
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
