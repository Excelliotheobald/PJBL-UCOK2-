import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "ChooseRole">;

export default function ChooseRole({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Peran Anda</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Saya Siswa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Saya Guru</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#1D1A9B",
    padding: 15,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
