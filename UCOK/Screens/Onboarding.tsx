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

  // animasi floating
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -30,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

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
      {/* Floating lingkaran */}
      <Animated.View
        style={[styles.circle2, { top: 100, left: 40, transform: [{ translateY: floatAnim }] }]}
      />
      <Animated.View
        style={[styles.circle3, { top: 200, right: 30, transform: [{ translateY: floatAnim }] }]}
      />
      <Animated.View
        style={[styles.circle1, { top: 320, left: 60, transform: [{ translateX: floatAnim }] }]}
      />

      {/* Floating gambar */}
      <Animated.View style={[styles.imageWrapper, { transform: [{ translateY: floatAnim }] }]}>
        <Image
          source={require("./Onboarding.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      {/* indikator */}
      <View style={styles.dotsWrapper}>
        {slides.map((_, i) => (
          <View key={i} style={[styles.dot, { opacity: page === i ? 1 : 0.3 }]} />
        ))}
      </View>

      {/* Scroll teks */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const pageNumber = Math.round(e.nativeEvent.contentOffset.x / width);
          setPage(pageNumber);
        }}
        scrollEventThrottle={16}
        style={styles.textSlider}
      >
        {slides.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        ))}
      </ScrollView>

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
    backgroundColor: "#A5DB00",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "absolute",
    top: height * 0.1,
    alignSelf: "center",
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
  },
  circle1: {
    position: "absolute",
    width: 140,
    height: 140,
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
  dotsWrapper: {
    position: "absolute",
    top: height * 0.55,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
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
