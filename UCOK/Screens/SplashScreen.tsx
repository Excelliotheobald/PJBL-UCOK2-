import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Video from "react-native-video";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 6500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        source={require("./SPLASH.mp4")} // pastikan path benar
        style={styles.backgroundVideo}
        resizeMode="cover"
        muted
        repeat={false}
        paused={false}
        onEnd={() => navigation.replace("Onboarding")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundVideo: {
    width: width,
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
