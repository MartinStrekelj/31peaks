import React, { useCallback, useState } from "react";
import { IPeak, ISummit, summitPeak } from "../../backend/PeaksApi";
import { ScrollView, Text } from "react-native";
import { ListItem } from "./ListItem";
import { Button, Colors, Dialog, Paragraph, Portal } from "react-native-paper";
import { useAppContext } from "../../lib/AppContext";

interface IListPeaks {
  peaks: IPeak[];
  summitIds: string[];
}

export const ListPeaks = ({ peaks, summitIds }: IListPeaks) => {
  const [dialog, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<null | IPeak>(null);
  const { identity, locallyUpdateSummits } = useAppContext();
  const renderPeaksCard = useCallback(
    (peak: IPeak) => (
      <ListItem key={peak.name} peak={peak} isSummited={summitIds.includes(peak.id)} onPress={showDialog} />
    ),
    [peaks, summitIds]
  );

  const showDialog = (peak: IPeak) => {
    setSelected(peak);
    setVisible(true);
  };

  const handleSummit = async () => {
    if (identity === null || selected === null) {
      console.error("You must be log in to summit peaks");
      return;
    }

    setLoading(true);
    const response = await summitPeak(selected.id, identity.uid);
    setLoading(false);
    setVisible(false);
    if (!response.ok) {
      return;
    }

    const summit: ISummit = {
      peak: selected.id,
      user: identity.uid,
      date: new Date(),
    };
    locallyUpdateSummits(summit);
  };

  return (
    <>
      <Portal>
        <Dialog visible={dialog} onDismiss={() => setVisible(false)}>
          <Dialog.Content>
            <Paragraph>
              Have you summit <Text style={{ fontWeight: "bold" }}>{selected?.name}</Text>?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={Colors.red400} onPress={() => setVisible(false)}>
              No
            </Button>
            <Button
              mode='contained'
              style={{ backgroundColor: Colors.blue400, margin: 5 }}
              onPress={handleSummit}
              loading={loading}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView style={{ width: "100%" }}>{peaks.map(renderPeaksCard)}</ScrollView>
    </>
  );
};
