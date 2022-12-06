import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext(undefined);

export const ContextAPI = (props) => {
  const [loadingDone, setloadingDone] = useState(false);
  const [actionDone, setactionDone] = useState(false);

  return (
    <DataContext.Provider
      value={{
        loadedValue: [loadingDone, setloadingDone],
        actionValue: [actionDone, setactionDone],
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};