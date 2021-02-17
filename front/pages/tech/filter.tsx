import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InfoDisplay, List } from "../../components/filterComponents";
import { ProjectEntity, useProjectsQuery } from "../../generated/graphql";

export default function Filter() {
  const [{ data, fetching }] = useProjectsQuery();
  const [details, setDetails] = useState<ProjectEntity | undefined>(undefined);

  useEffect(() => {
    const savedSelection = localStorage.getItem("savedSelection");
    if (savedSelection) setDetails(JSON.parse(savedSelection));
  }, []);

  //todo, show universal loading screen while loading
  if (fetching) return <div>Loading...</div>;

  return (
    <Flex
      flexDir={["column", "column", "column", "row"]}
      w={"100%"}
      h={["auto", null, "100vh"]}
    >
      <List details={details} />
      <InfoDisplay data={data} setDetails={setDetails} />
    </Flex>
  );
}
