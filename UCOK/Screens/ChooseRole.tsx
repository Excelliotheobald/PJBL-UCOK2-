import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
} from "react-native";



const { width, height } = Dimensions.get("window");

export default function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const shadowOpacityAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-5deg", "5deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: -20,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const openModal = (type: "login" | "register") => {
    if (type === "login") setShowLogin(true);
    else setShowRegister(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowLogin(false);
      setShowRegister(false);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./tandatanya.png")}
        style={[
          styles.tandatanya,
          {
            transform: [{ translateY: floatAnim }, { rotate: rotateInterpolate }],
            shadowOpacity: shadowOpacityAnim,
          },
        ]}
      />

      <Image source={require("./mata.png")} style={styles.eye} resizeMode="contain" />

      <View style={styles.content}>
        <Text style={styles.title}>Halo Sobat Ucoy!</Text>
        <Text style={styles.subtitle}>Sebagai peran apakah kamu di sini?</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedRole("guru")}
        >
          <View style={styles.optionLeft}>
            <Image source={require("./ops.png")} style={styles.optionIcon} />
            <View>
              <Text style={styles.optionTitle}>Guru</Text>
              <Text style={styles.optionDesc}>
                Guru membuat soal, melibatkan, dan menilai hasil pengerjaan siswa.
              </Text>
            </View>
          </View>
          <View style={styles.radioCircle}>
            {selectedRole === "guru" && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setSelectedRole("siswa")}
        >
          <View style={styles.optionLeft}>
            <Image source={require("./siswa.png")} style={styles.optionIcon} />
            <View>
              <Text style={styles.optionTitle}>Siswa</Text>
              <Text style={styles.optionDesc}>
                Berpartisipasi dalam mengerjakan soal ujian.
              </Text>
            </View>
          </View>
          <View style={styles.radioCircle}>
            {selectedRole === "siswa" && <View style={styles.radioDot} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: selectedRole ? 1 : 0.5 }]}
          disabled={!selectedRole}
          onPress={() => openModal("login")}
        >
          <Text style={styles.buttonText}>Pilih Peranmu</Text>
        </TouchableOpacity>
      </View>

      {(showLogin || showRegister) && (
  <>
    {/* Tambahkan overlay di belakang modal */}
    <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeModal} />

    <Animated.View
      style={[
        styles.modalContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {showLogin ? (
        <LoginView onClose={closeModal} onSwitch={() => openModal("register")} />
      ) : (
        <RegisterView onClose={closeModal} onSwitch={() => openModal("login")} />
      )}
    </Animated.View>
  </>
)}
    </View>
  );
}

function LoginView({ onClose, onSwitch }: any) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFilled = email && password;

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />
      <Text style={styles.modalTitle}>Selamat Datang</Text>
      <Text style={styles.modalSubtitle}>Silahkan Masuk</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.modalButton,
          { backgroundColor: isFilled ? "#3A4FE7" : "#AEB9FF" },
        ]}
      >
        <Text style={styles.modalButtonText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.registerText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Tutup</Text>
      </TouchableOpacity>
    </View>
  );
}

function RegisterView({ onClose, onSwitch }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFilled = name && email && password;

  return (
    <View style={styles.modalContent}>
      <View style={styles.handle} />
      <Text style={styles.modalTitle}>Buat Akun Baru</Text>
      <Text style={styles.modalSubtitle}>Silahkan Daftar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Kata Sandi"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[
          styles.modalButton,
          { backgroundColor: isFilled ? "#3A4FE7" : "#AEB9FF" },
        ]}
      >
        <Text style={styles.modalButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.registerText}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>Tutup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#B2DF20", alignItems: "center" },
  tandatanya: {
    width: 90,
    height: 100,
    position: "relative",
    top: 140,
    tintColor: "#2F2FE0",
  },
  eye: {
    width: 160,
    height: 60,
    position: "absolute",
    top: height * 0.31,
    zIndex: 1,
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.68,
    backgroundColor: "#f2f2f2",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    paddingHorizontal: 25,
    paddingTop: 100,
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#000" },
  subtitle: { fontSize: 18, color: "#000", marginVertical: 10, textAlign: "center" },
  option: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 5,
  },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionIcon: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  optionTitle: { fontSize: 22, fontWeight: "bold" },
  optionDesc: { color: "#000", fontSize: 16, maxWidth: width * 0.55, paddingTop: 10 },
  radioCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2f2fe0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: "#2f2fe0" },
  button: {
    marginTop: 140,
    width: "100%",
    backgroundColor: "#2F2FE0",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#f2f2f2", fontSize: 16, fontWeight: "600" },

modalContainer: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: height * 0.75, 
  backgroundColor: "#fff",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  elevation: 20,
  paddingHorizontal: 25,
  zIndex: 10, 
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: -4 },
  shadowRadius: 8,
},

overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)", 
  zIndex: 5,
},

  modalContent: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  handle: {
    width: 80,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: "bold", color: "#000" },
  modalSubtitle: { color: "#666", marginBottom: 25 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  modalButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  forgotText: { color: "#2F2FE0", marginTop: 15 },
  registerText: { color: "#2F2FE0", marginTop: 10 },
  closeText: { color: "red", marginTop: 20 },
});
