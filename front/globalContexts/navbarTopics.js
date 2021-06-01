import React, { useState } from "react";
import { homeURL } from "../constants/homeUrl";

//This file is .js because webpack import error; too lazy to deal with that again.
//to get type, just import navbarTopics
//Any page with a prefix {groupName}: {pageName} will be put into a dropdown
export const navbarTopics = {
  home: {
    url: homeURL,
    pageName: "Home: Timeline",
  },
  filter: {
    url: homeURL + "filter",
    pageName: "Home: Filter",
  },
  about: { url: homeURL + "about", pageName: "Bio" },
};

//Two context, each for different purposes.
//One is to store the value context,
//the other is for the function that sets the value of that context.
export const TopicsContext = React.createContext();
export const TopicsUpdateContext = React.createContext();

export function DefaultTopicsProvider({ children }) {
  const [defaultTopics, setDefaultTopics] = useState(navbarTopics);

  return (
    <TopicsContext.Provider value={defaultTopics}>
      <TopicsUpdateContext.Provider value={setDefaultTopics}>
        {children}
      </TopicsUpdateContext.Provider>
    </TopicsContext.Provider>
  );
}
