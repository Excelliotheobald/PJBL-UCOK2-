// Siswa.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Siswa() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Selamat Datang Siswa!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("ChooseRole" as never)}
        style={{ marginTop: 30, backgroundColor: "red", padding: 10, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
