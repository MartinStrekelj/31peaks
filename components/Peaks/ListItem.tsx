import React from "react";
import { Text } from "react-native";
import { Avatar, Colors, List } from "react-native-paper";
import { IPeak } from "../../backend/PeaksApi";

interface ListItemProps {
  peak: IPeak;
  onPress: (peak: IPeak) => void;
  isSummited: boolean;
}

export const ListItem = ({ peak, onPress, isSummited }: ListItemProps) => {
  return (
    <List.Item
      onPress={() => onPress(peak)}
      style={{
        margin: 10,
        backgroundColor: Colors.white,
        width: "95%",
        borderRadius: 20,
        borderColor: Colors.black,
        borderWidth: 2,
      }}
      title={() => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
          }}>{`${peak.name} (${peak.height}m)`}</Text>
      )}
      description={() => <Text>{`${peak.location}`}</Text>}
      left={(props) => (
        <Avatar.Icon
          {...props}
          icon={`${isSummited ? "check" : "mountain"}`}
          size={64}
          color={Colors.grey100}
          style={{ backgroundColor: isSummited ? Colors.green400 : Colors.blue400 }}
        />
      )}
    />
  );
};
