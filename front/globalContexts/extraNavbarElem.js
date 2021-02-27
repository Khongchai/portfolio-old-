import React, { useState } from "react";

export const ExtraElemContext = React.createContext();
export const AddExtraElemContext = React.createContext();

export function ExtraElemProvider({ children }) {
  const [defaultTopics, setDefaultTopics] = useState(null);

  return (
    <ExtraElemContext.Provider value={defaultTopics}>
      <AddExtraElemContext.Provider value={setDefaultTopics}>
        {children}
      </AddExtraElemContext.Provider>
    </ExtraElemContext.Provider>
  );
}
