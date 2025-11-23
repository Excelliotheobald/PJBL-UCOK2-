import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Footerguru from "../Components/Footerguru"; 
// Pastikan path nya benar:  UCOK/Components/Footerguru.tsx

export default function Profileguru() {
  return (
    <View style={styles.container}>
      {/* ====== CONTENT ====== */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Halaman Profil Guru</Text>
      </View>

      {/* ====== FOOTER BARU ====== */}
      <Footerguru activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6FF",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 120, // supaya konten tidak tertutup footer
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D1A9B",
  },
});
