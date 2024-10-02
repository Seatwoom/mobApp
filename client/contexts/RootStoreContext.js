import React, { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react-lite";
import RootStore from "../stores/RootStore";
import TaskStore from "../stores/TaskStore";

const RootStoreContext = createContext(null);

export const RootStoreProvider = ({ children }) => {
  const store = useLocalObservable(() =>
    RootStore.create({
      taskStore: TaskStore.create({}),
    })
  );

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useRootStore must be used within a RootStoreProvider");
  }
  return context;
};
