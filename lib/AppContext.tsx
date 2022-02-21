import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAllPeaks, IPeak } from "../backend/PeaksApi";

interface IAppContext {
  peaks: IPeak[];
  identity: string;
  conquered: number;
}

const AppContext = createContext<IAppContext>({
  peaks: [],
  identity: "Helloo world!",
  conquered: 0,
});

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: ProviderProps) => {
  const [peaks, setPeaks] = useState<IPeak[]>([]);
  const [auth, setAuth] = useState<string>("");
  const [conquered, setConquered] = useState<number>(0);

  useEffect(() => {
    const onAppInit = async () => {
      const peaks = await fetchAllPeaks();
      setPeaks(peaks);
    };
    onAppInit();
  }, []);

  return (
    <AppContext.Provider value={{ peaks, identity: auth, conquered }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
