import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import InfoDisplay from "../components/filterComponents/InfoDisplay/index";
import List from "../components/filterComponents/List";
import { SearchAndFindWrapper } from "../components/filterComponents/SearchAndFilterBoxes";
import {
  ProjectEntity,
  useAllProjectsNotPaginatedQuery,
  useProjectsQuery,
} from "../generated/graphql";
import { AddExtraElemContext } from "../globalContexts/extraNavbarElem";
import { setAsSelected } from "../utils/animations/filter/setAsSelected";
import { ThreeJSInstance } from "../utils/landingPage/initThreeJS";
import { getNavbarHeight } from "../utils/navbar/getNavbarHeight";

export const Filter: React.FC<{ selection: string | undefined }> = ({
  selection,
}) => {
  const [searchParams, setSearchParams] = useState<{
    search: string | undefined;
    sortBy: "Title" | "Date" | undefined;
    order: "ASC" | "DESC" | undefined;
    //"Projects" = search by projects, "Technologies" = search by Technologies used
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
  const [showAllProjects, setShowAllProjects] = useState(false);
  let [{ data, fetching }] = useProjectsQuery({
    variables: { ...queryVariables, getAll: showAllProjects },
  });

  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);

  //Re-highlights projects everytime user switches from show all to show less
  useEffect(() => {
    if (details) {
      setAsSelected(details.title);
    }
  }, [showAllProjects, fetching]);

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
      ...queryVariables,
      skip: queryVariables.skip + queryVariables.limit,
    });
  }

  function paginateBackward() {
    setQueryVariables({
      ...queryVariables,
      skip: queryVariables.skip - queryVariables.limit,
    });
  }

  const [navbarHeight, setNavbarHeight] = useState("");
  useEffect(() => {
    setNavbarHeight(getNavbarHeight());
    const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
    if (canvas && typeof window !== "undefined" && window) {
      const threejs = new ThreeJSInstance(canvas, true);
      threejs.main();
    }
  }, []);

  return (
    <>
      <Flex
        id="filter-page"
        flexDir={["column", "column", "column", "column", "row", "row"]}
        w={"100%"}
        h={["auto", null, `max(calc(100vh - ${navbarHeight}), 800px)`]}
        pb="1.5rem"
        className="filter-page-container"
      >
        <InfoDisplay details={details} />
        <List
          searchFetching={fetching}
          data={data}
          selection={selection}
          detailsState={{ setDetails: setDetails, details: details }}
          paginateForward={paginateForward}
          paginateBackward={paginateBackward}
          showAllProjectsState={{
            showAllProjects: showAllProjects,
            setShowAllProjects: setShowAllProjects,
          }}
        />
      </Flex>
      <canvas
        className="webgl"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: 1,
        }}
      />
    </>
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
