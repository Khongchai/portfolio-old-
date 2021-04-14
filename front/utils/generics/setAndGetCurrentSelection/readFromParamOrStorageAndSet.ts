import { useEffect, useState } from "react";
import {
  ProjectEntity,
  useGetSingleProjectByTitleQuery,
} from "../../../generated/graphql";
import { setToLocalStorageAndSelectedState } from "./setToLocalStorageAndSelectedState";

export function readFromParamOrStorage(
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >,
  queryFromURL: string | undefined,
  fallbackValue?: ProjectEntity
) {
  const [runOnceAlready, setRunOnceAlready] = useState<boolean>(false);
  const [singleFetchParam, setSingleFetchParam] = useState<string | undefined>(
    undefined
  );
  const [{ data: singleProject, fetching }] = useGetSingleProjectByTitleQuery({
    variables: { title: singleFetchParam } as any,
  });

  useEffect(() => {
    if (!runOnceAlready) {
      if (queryFromURL) {
        //a queryFromURL is specified in the url param; a single query will be made
        setSingleFetchParam(queryFromURL);
        if (!fetching) {
          setToLocalStorageAndSelectedState(
            singleProject?.getSingleProjectByTitle.proj!,
            setStateFunction
          );
          setRunOnceAlready(true);
        }
      } else if (!fetching) {
        //a queryFromURL is not specified in the url param, load from localStorage instead, if exists
        //if not, check to see if there is a provided fallbackValue
        if (!loadFromLocalStorage(setStateFunction) && fallbackValue) {
          setToLocalStorageAndSelectedState(fallbackValue, setStateFunction);
          setRunOnceAlready(true);
        }
      }
    }
  }, [fetching, fallbackValue]);
}

function loadFromLocalStorage(
  setStateFunction: React.Dispatch<
    React.SetStateAction<ProjectEntity | undefined>
  >
): boolean {
  const savedSelection = localStorage.getItem("savedSelection");
  /**
   * Undefined will be stored in local storage as string
   */
  if (savedSelection && savedSelection !== "undefined") {
    //Only set state because selection already in local storage
    setToLocalStorageAndSelectedState(
      JSON.parse(savedSelection),
      setStateFunction,
      true
    );
    setStateFunction(JSON.parse(savedSelection));
    return true;
  }
  return false;
}
