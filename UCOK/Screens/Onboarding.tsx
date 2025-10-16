import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  Easing,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const { width, height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export default function Onboarding({ navigation }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Kerjakan Ujian Tepat Waktu",
      desc: "Dengan UCOK, ujian kamu akan terlaksana sesuai jadwal, lho!",
    },
    {
      id: 2,
      title: "Pantau Nilai dengan Mudah",
      desc: "Lihat hasil ujianmu kapan saja, langsung dari aplikasi.",
    },
    {
      id: 3,
      title: "Belajar Lebih Efektif",
      desc: "Dapatkan tips belajar dan progress report setiap minggu.",
    },
  ];

  // 🎨 Animasi lingkaran
  const circleAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  // 🎨 Animasi gambar
  const imageAnim = useRef(new Animated.Value(0)).current;

  // 🎨 Animasi scroll untuk dot
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // loop lingkaran
    circleAnims.forEach((anim, i) => {
      const distance = 20 + i * 5;
      const delay = i * 700;
      const duration = 3000 + i * 600;

      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: distance,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(anim, {
            toValue: -distance,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // loop gambar
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, {
          toValue: -15,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: 15,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleNext = () => {
    if (page < slides.length - 1) {
      scrollRef.current?.scrollTo({ x: width * (page + 1), animated: true });
      setPage(page + 1);
    } else {
      navigation.replace("ChooseRole");
    }
  };

  const handleSkip = () => {
    navigation.replace("ChooseRole");
  };

  return (
    <View style={styles.container}>
      {/* 🎨 Floating lingkaran */}
      <Animated.View
        style={[
          styles.circle1,
          { top: 380, left: 60, transform: [{ translateX: circleAnims[0] }] },
        ]}
      />
      <Animated.View
        style={[
          styles.circle2,
          { top: 100, left: 50, transform: [{ translateY: circleAnims[1] }] },
        ]}
      />
      <Animated.View
        style={[
          styles.circle3,
          { top: 130, right: 40, transform: [{ translateX: circleAnims[2] }] },
        ]}
      />
      <Animated.View
        style={[
          styles.circle4,
          { top: 420, right: 80, transform: [{ translateY: circleAnims[3] }] },
        ]}
      />

      {/* 🎨 Floating gambar */}
      <Animated.View style={{ transform: [{ translateY: imageAnim }] }}>
        <Image
          source={require("./Onboarding.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.dotsWrapper}>
        {slides.map((_, i) => {
          const inputRange = [
            (i - 1) * width,
            i * width,
            (i + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 40, 10], // dot melebar di tengah
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Scroll teks */}
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={styles.textSlider}
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Lewati</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B2DF20",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    bottom: height * 0.2,
    width: width * 0.8,
    height: height * 0.35,
    zIndex: 10,
    alignSelf: "center",
  },
  circle1: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#004aad",
  },
  circle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#004aad",
  },
  circle3: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#004aad",
  },
  circle4: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#004aad",
  },
  dotsWrapper: {
    position: "absolute",
    top: height * 0.55,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#004aad",
    marginHorizontal: 5,
  },
  textSlider: {
    position: "absolute",
    bottom: 250,
  },
  slide: {
    width,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 12,
  },
  desc: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  skipBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 20,
    opacity: 0.8,
  },
  skipText: { color: "#000", fontSize: 16 },
  nextBtn: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#1E40AF",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: -10,
  },
});
