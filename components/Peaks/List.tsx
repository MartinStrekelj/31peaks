import React, { useCallback } from "react";
import { IPeak } from "../../backend/PeaksApi";
import { ScrollView } from "react-native";
import { ListItem } from "./ListItem";

interface IListPeaks {
  peaks: IPeak[];
}

export const ListPeaks = ({ peaks }: IListPeaks) => {
  const renderPeaksCard = useCallback(
    (peak: IPeak) => <ListItem key={peak.name} peak={peak} />,
    [peaks]
  );

  return (
    <ScrollView style={{ width: "100%" }}>
      {peaks.map(renderPeaksCard)}
    </ScrollView>
  );
};
