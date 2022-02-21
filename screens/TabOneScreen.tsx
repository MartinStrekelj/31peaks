import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Colors, Title } from "react-native-paper";

import { RootTabScreenProps } from "../types";

const backgroundImage = require("../assets/images/mountain.jpg");

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode='cover'
        style={styles.image}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Title style={{ color: Colors.black }}>1 / 31</Title>
          </View>
          <View style={styles.titleContainer}></View>
          <View style={styles.titleContainer}></View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    fontFamily: "kaushan-script",
  },
});
