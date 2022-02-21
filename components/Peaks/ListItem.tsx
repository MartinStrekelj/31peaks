import React from "react";
import { Text } from "react-native";
import { Avatar, Colors, List } from "react-native-paper";
import { IPeak } from "../../backend/PeaksApi";

interface ListItemProps {
  peak: IPeak;
}

export const ListItem = ({ peak }: ListItemProps) => {
  return (
    <List.Item
      style={{
        margin: 10,
        backgroundColor: Colors.white,
        width: "95%",
        borderRadius: 20,
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
          icon='mountain'
          size={64}
          color={Colors.grey100}
          style={{ backgroundColor: Colors.blue400 }}
        />
      )}
    />
  );
};
