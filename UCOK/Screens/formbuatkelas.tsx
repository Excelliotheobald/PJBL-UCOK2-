import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import {
  ChevronLeft,
  BookOpen,
  Users,
  MapPin,
  GraduationCap,
  Sparkles,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  icon: React.ReactNode;
};

const InputField = ({ label, value, onChangeText, icon }: any) => {
  const [focused, setFocused] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handleFocus = (e: any) => {
    setFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = (e: any) => {
    setFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.inputWrapper,
        {
          transform: [{ scale: scaleAnim }],
          borderColor: focused ? "#3246ff" : "#ccc",
          shadowOpacity: focused ? 0.2 : 0.05,
        },
      ]}
    >
      <View style={styles.iconContainer}>{icon}</View>

      <Text
        style={[
          styles.floatingLabel,
          {
            top: value || focused ? -10 : 14,
            fontSize: value || focused ? 12 : 16,
            color: focused ? "#3246ff" : "#777",
          },
        ]}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </Animated.View>
  );
};

export default function FormBuatKelas({ navigation }: any) {
  const [namaKelas, setNamaKelas] = useState("");
  const [bagian, setBagian] = useState("");
  const [ruang, setRuang] = useState("");
  const [mapel, setMapel] = useState("");

  const isFilled = namaKelas && bagian && ruang && mapel;

  const simpanKelas = async () => {
  if (!isFilled) return;

  const dataKelasBaru = { 
    namaKelas, 
    bagian, 
    ruang, 
    mapel 
  };

  try {
    // Ambil data lama dari AsyncStorage
    const dataLama = await AsyncStorage.getItem("kelas");
    let arrKelas = dataLama ? JSON.parse(dataLama) : [];

    // Tambah data baru
    arrKelas.push(dataKelasBaru);

    // Simpan lagi ke AsyncStorage
    await AsyncStorage.setItem("kelas", JSON.stringify(arrKelas));

    // Kembali ke Guru.tsx
    navigation.navigate("Guru");

  } catch (error) {
    console.log("Error simpan kelas:", error);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft size={28} color="#3246ff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Buat Kelas</Text>

        <TouchableOpacity
          onPress={simpanKelas}
          disabled={!isFilled}
          style={[
            styles.createButton,
            { backgroundColor: isFilled ? "#b2df20" : "#e0e0e0" },
          ]}
        >
          <Text
            style={[styles.createText, { color: isFilled ? "#000" : "#999" }]}
          >
            Buat
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {/* ===== CARD MOTIVASI (TETAP DI ATAS) ===== */}
        <View style={styles.motivasiCard}>
          <Sparkles size={32} color="#3246ff" />
          <Text style={styles.motivasiTitle}>Ayo Buat Kelas mu!</Text>
          <Text style={styles.motivasiDesc}>
            Mulailah dengan mengisi nama kelas di bawah. Kamu bisa membuat ruang
            belajar yang keren untuk murid-muridmu!
          </Text>
        </View>

        {/* ===== INPUTS ===== */}
        <InputField
          label="Nama Kelas (wajib)"
          value={namaKelas}
          onChangeText={setNamaKelas}
          icon={<BookOpen size={20} color="#3246ff" />}
        />

        <InputField
          label="Bagian"
          value={bagian}
          onChangeText={setBagian}
          icon={<Users size={20} color="#3246ff" />}
        />

        <InputField
          label="Ruang"
          value={ruang}
          onChangeText={setRuang}
          icon={<MapPin size={20} color="#3246ff" />}
        />

        <InputField
          label="Mata Pelajaran"
          value={mapel}
          onChangeText={setMapel}
          icon={<GraduationCap size={20} color="#3246ff" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    height:
      Platform.OS === "android" ? 70 + (StatusBar.currentHeight || 0) : 90,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  backButton: { position: "absolute", left: 16, bottom: 14, padding: 5 },

  headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },

  createButton: {
    position: "absolute",
    right: 16,
    bottom: 10,
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
  },

  createText: { fontWeight: "600" },

  form: { padding: 15 },

  /* ====CARD MOTIVASI==== */
  motivasiCard: {
    backgroundColor: "#f6faff",
    borderWidth: 1.5,
    borderColor: "#d5e3ff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  motivasiTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3246ff",
    marginTop: 10,
  },

  motivasiDesc: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },

  /* ====INPUT==== */
  inputWrapper: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 12,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  floatingLabel: {
    position: "absolute",
    left: 45,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },

  input: { fontSize: 16, paddingLeft: 35, color: "#000" },

  iconContainer: { position: "absolute", left: 12, top: 18 },
});
