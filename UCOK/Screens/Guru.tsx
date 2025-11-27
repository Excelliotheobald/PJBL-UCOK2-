import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import Footerguru from "../Components/Footerguru";
import { Bell } from "lucide-react-native";

export default function Guru() {
  return (
    <View style={{ flex: 1 }}> 
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
            }}
            style={styles.profileImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Halo, Pak Khoirul S 👋</Text>
            <Text style={styles.subWelcomeText}>Selamat datang!</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notifButton}>
          <Bell size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* SCROLLVIEW KONTEN */}
      <ScrollView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#2A3FD8" />
      </ScrollView>

      {/* FOOTER */}
   <Footerguru activeTab="home" />

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E2CC1",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  textContainer: {
    marginLeft: 12,
  },

  welcomeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  subWelcomeText: {
    color: "#D5D9FF",
    fontSize: 14,
    marginTop: 2,
    fontWeight: "500",
  },

  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});
