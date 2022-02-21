import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { facebookLoginAPI, getUserFromStorage } from "../backend/AuthApi";
import { fetchAllPeaks, getUserSummits, IPeak, ISummit } from "../backend/PeaksApi";

interface IAppContext {
  peaks: IPeak[];
  identity: User | null;
  summits: string[];
  locallyUpdateSummits: (summit: ISummit) => void;
  login: () => void;
}

const AppContext = createContext<IAppContext>({
  peaks: [],
  identity: null,
  summits: [],
  login: () => {},
  locallyUpdateSummits: (summit: ISummit) => {},
});

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: ProviderProps) => {
  const [peaks, setPeaks] = useState<IPeak[]>([]);
  const [auth, setAuth] = useState<User | null>(null);
  const [summits, setSummits] = useState<ISummit[]>([]);
  const { removeItem } = useAsyncStorage("summits");

  useEffect(() => {
    const onAppInit = async () => {
      const peaks = await fetchAllPeaks();
      const user = await getUserFromStorage();
      if (user !== null) {
        const summits = await getUserSummits(user.uid);
        setSummits(summits);
      }
      setPeaks(peaks);
      setAuth(user);
    };
    onAppInit();
  }, []);

  const loginProcess = async () => {
    const user = await facebookLoginAPI();
    if (user) {
      const summits = await getUserSummits(user.uid);
      setSummits(summits);
      setAuth(user);
    }
  };

  const updateSummits = (summit: ISummit) => {
    setSummits([...summits, summit]);
    /**
     * Remove the storage since on next refresh we want to fetch the actuall data from API
     */
    removeItem();
  };

  return (
    <AppContext.Provider
      value={{
        peaks,
        identity: auth,
        summits: summits.map((s) => s.peak),
        login: loginProcess,
        locallyUpdateSummits: updateSummits,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
