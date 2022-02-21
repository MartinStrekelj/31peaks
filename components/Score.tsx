import { Text, StyleSheet } from "react-native";
import React from "react";

interface IScoreProps {
  summits: number;
  total: number;
}

export const Score = ({ summits, total }: IScoreProps) => {
  const text = `${summits} / ${total}`;
  return <Text style={styles.score}>{text}</Text>;
};

const styles = StyleSheet.create({
  score: {
    zIndex: 9999,
    textAlign: "center",
    fontFamily: "kaushan-script",
    fontSize: 64,
    width: "100%",
  },
});
