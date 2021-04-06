import { useEffect, useState } from "react";
import {
  ProjectEntity,
  useGetSingleProjectByTitleQuery,
} from "../../generated/graphql";
import setQueryParam from "./setQueryParam";

//TODO rename to something more descriptive of what this function does
export function readFromParamOrStorageAndSet(
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >,
  queryFromURL: string | undefined,
  projTitle: string | undefined,
  currentPageRelativePath: string,
  fallbackValue?: ProjectEntity
) {
  const [runOnceAlready, setRunOnceAlready] = useState<boolean>(false);
  const [singleFetchParam, setSingleFetchParam] = useState<string | undefined>(
    undefined
  );
  const [{ data: singleProject, fetching }] = useGetSingleProjectByTitleQuery({
    variables: { title: singleFetchParam } as any,
  });

  //refactor to multiple useEffect
  useEffect(() => {
    if (!runOnceAlready) {
      if (queryFromURL) {
        //a queryFromURL is specified in the url param; a single query will be made
        setSingleFetchParam(queryFromURL);
        if (!fetching) {
          setStateFunction(singleProject?.getSingleProjectByTitle.proj!);
          setRunOnceAlready(true);
        }
      } else if (!fetching) {
        //a queryFromURL is not specified in the url param, load from localStorage instead, if exists
        loadFromLocalStorage(setStateFunction);
        setRunOnceAlready(true);
      }
    }
  }, [fetching]);

  useEffect(() => {
    if (projTitle) {
      setQueryParam(projTitle, currentPageRelativePath);
    }
  }, [projTitle]);

  useEffect(() => {
    if (fallbackValue && !fetching) {
      setStateFunction(fallbackValue);
    }
  }, [fetching, fallbackValue]);
}

export function loadFromLocalStorage(
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >
) {
  const savedSelection = localStorage.getItem("savedSelection");
  if (savedSelection) setStateFunction(JSON.parse(savedSelection));
}
