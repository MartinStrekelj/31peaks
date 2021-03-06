import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Colors, Searchbar } from "react-native-paper";
import { IPeak } from "../backend/PeaksApi";
import { Filter } from "../components/Filter";

import { ListPeaks } from "../components/Peaks/List";
import { Text, View } from "../components/Themed";
import { useAppContext } from "../lib/AppContext";

export default function TabTwoScreen() {
  const { peaks, summits } = useAppContext();
  const [query, setQuery] = useState<string>("");
  const [filteredPeaks, setFilteredPeaks] = useState<IPeak[]>([]);

  const onChangeSearch = (v: string) => setQuery(v);

  useEffect(() => {
    if (!query.length) {
      setFilteredPeaks(peaks);
      return;
    }

    setFilteredPeaks(peaks.filter((peak: IPeak) => peak.name.includes(query.toUpperCase())));
  }, [query]);

  if (peaks.length <= 0) {
    return <ActivityIndicator color={Colors.blue400} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{peaks.length} Peaks</Text>
      <Searchbar
        style={{ marginVertical: 10 }}
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={query}
        autoComplete={false}
      />
      <ListPeaks peaks={filteredPeaks} summitIds={summits} />
      <Filter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
