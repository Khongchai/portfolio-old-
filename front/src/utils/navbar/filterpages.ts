import { navbarTopics } from "../../globalContexts/navbarTopics";
import { page } from "../../types/page";

export function filterPages(objectToBeFiltered: typeof navbarTopics) {
  let pagesWithNoDropdowns: page[] = [];
  let pagesGroup: { [sectionName: string]: page[] } = {};

  Object.values(objectToBeFiltered).map((page) => {
    const splitted = page.pageName.split(":");
    //Put this into a dropdown because there is a prefix
    if (splitted.length > 1) {
      if (!pagesGroup[splitted[0]]) {
        //define, if not previous done
        pagesGroup[splitted[0]] = [];
      }
      pagesGroup[splitted[0]].push(page);
    } else {
      pagesWithNoDropdowns.push(page);
    }
  });

  return { pagesGroup, pagesWithNoDropdowns };
}
