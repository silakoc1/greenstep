import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { View } from "react-native";
import { useCallback, useEffect } from "react";
import { useRouter } from "expo-router";

const Layout = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.push("/screens/Login");
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Greenstep" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="Register" options={{ title: "Register" }} />
    </Stack>
  );
};

export default Layout;
