import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface IMapContext {
  isDone: boolean;
  setIsDone: (isDone: boolean) => void;
}

const DEFAULT_CONTEXT = {
  isDone: false,
  setIsDone: () => {
    throw new Error("setIsDone function should be overridden");
  },
};

const MapContext = createContext<IMapContext>(DEFAULT_CONTEXT);

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDone, setIsDone] = useState(DEFAULT_CONTEXT.isDone);

  return (
    <MapContext.Provider
      value={{
        isDone,
        setIsDone,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
