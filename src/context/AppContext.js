import { createContext, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error(
      "useAppContext should be used within <AppContext.Provider>"
    );
  }
  return appContext;
};
