import React, { useState } from "react";

//This file is .js because webpack import error; too lazy to deal with that again.
//to get type, just import navbarTopics
//Put Home: {name} for pages that are a subset of home.
export const navbarTopics = {
  home: {
    url: "/tech",
    pageName: "Home: Timeline",
  },
  filter: {
    url: "/tech/filter",
    pageName: "Home: Filter",
  },
  about: { url: "/tech/about", pageName: "About" },
};

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
