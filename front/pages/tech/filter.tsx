import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfoDisplay from "../../components/filterComponents/InfoDisplay/index";
import List from "../../components/filterComponents/List/index";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";
import { GetServerSideProps } from "next";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  const [{ data, fetching }] = useProjectsQuery();
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (firstLoad) {
      //onFirstload, if param exists, load from param instead of localStorage
      //might want to refactor this logic to the List component
      if (selection) {
        //do smth
      } else {
        loadFromLocalStorage();
      }

      setFirstLoad(false);
    }
    if (details?.title) {
      router.push({
        pathname: "/tech/filter",
        query: { selection: details.title },
      });
    }
  }, [details]);

  function loadFromLocalStorage() {
    const savedSelection = localStorage.getItem("savedSelection");
    if (savedSelection) setDetails(JSON.parse(savedSelection));
  }

  //todo, show universal loading screen while loading
  if (fetching) return <div>Loading...</div>;

  return (
    <Flex
      flexDir={["column", "column", "column", "column", "row", "row"]}
      w={"100%"}
      h={["auto", null, "100vh"]}
    >
      <InfoDisplay details={details} />
      <List data={data} setDetails={setDetails} />
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
