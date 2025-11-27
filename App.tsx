import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./UCOK/Screens/SplashScreen";
import Onboarding from "./UCOK/Screens/Onboarding";
import ChooseRole from "./UCOK/Screens/ChooseRole";
import Guru from "./UCOK/Screens/Guru";
import Siswa from "./UCOK/Screens/Siswa";

import Profileguru from "./UCOK/Screens/Profileguru";
import Profilesiswa from "./UCOK/Screens/Profilesiswa";  

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  ChooseRole: undefined;
  Guru: undefined;
  Siswa: undefined;
  Profileguru: undefined;
  Profilesiswa: undefined;           
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="ChooseRole" component={ChooseRole} />
        <Stack.Screen name="Guru" component={Guru} />
        <Stack.Screen name="Siswa" component={Siswa} />

        <Stack.Screen name="Profileguru" component={Profileguru} />
        <Stack.Screen name="Profilesiswa" component={Profilesiswa} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
