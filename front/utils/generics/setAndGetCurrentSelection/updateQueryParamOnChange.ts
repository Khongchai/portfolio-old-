import { useEffect } from "react";
import setQueryParam from "../setQueryParam";

export function updateQueryParamOnChange(
  projTitle: string | undefined,
  currentPageRelativePath: string
) {
  useEffect(() => {
    if (projTitle) {
      setQueryParam(projTitle, currentPageRelativePath);
    }
  }, [projTitle]);
}
