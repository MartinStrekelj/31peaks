import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import FontAwensome5 from "react-native-vector-icons/FontAwesome5";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider as PaperProvider } from "react-native-paper";
import AppContextProvider from "./lib/AppContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContextProvider>
        <PaperProvider
          settings={{ icon: (props) => <FontAwensome5 {...props} /> }}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </AppContextProvider>
    );
  }
}
