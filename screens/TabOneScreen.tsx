import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Avatar, Button, Colors, Divider, Title } from "react-native-paper";
import { Score } from "../components/Score";
import { useAppContext } from "../lib/AppContext";

import { RootTabScreenProps } from "../types";

const backgroundImage = require("../assets/images/mountain.jpg");

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const { identity, login, summits, peaks } = useAppContext();
  console.log(identity);
  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode='cover' style={styles.image}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            {identity === null && <Button onPress={login}>Login</Button>}
            {identity !== null && (
              <>
                {identity.photoURL !== null && <Avatar.Image size={48} source={{ uri: identity.photoURL }} />}
                <Score summits={summits.length} total={peaks.length} />
              </>
            )}
          </View>
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
    width: "100%",
    flex: 1 / 3,
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
