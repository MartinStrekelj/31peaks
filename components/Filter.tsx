import React from "react";
import { StyleSheet } from "react-native";
import { Colors, FAB } from "react-native-paper";

export const Filter = () => {
  return <FAB style={styles.fab} icon='filter' onPress={() => console.log("Pressed")} color={Colors.grey300} />;
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.blue400,
  },
});
