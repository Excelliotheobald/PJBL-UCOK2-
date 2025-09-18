import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./UCOK/Screens/SplashScreen";
import Onboarding from "./UCOK/Screens/Onboarding";
import ChooseRole from "./UCOK/Screens/ChooseRole";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  ChooseRole: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
