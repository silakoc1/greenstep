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
import { useEffect } from "react";
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
      }, 5000); // 5 saniye sonra giriş ekranına yönlendir

      return () => clearTimeout(timer); // Sayfa değişirse zamanlayıcıyı temizle
    }
  }, [fontsLoaded, router]);

  if (!fontsLoaded) {
    return null; // Eğer fontlar yüklenmediyse boş ekran göster
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
          <Stack.Screen name="Home" options={{ title: "Home" }} />
          <Stack.Screen name="Notification" options={{ title: "Notification" }} />
          <Stack.Screen name="Profile" options={{ title: "Profile" }} />
          <Stack.Screen name="Map" options={{ title: "Map" }} />
          <Stack.Screen name="NotificationDetails" options={{ title: "NotificationDetails" }} />
          <Stack.Screen name="notificationDetails" options={{ title: "notificationDetails" }} />
          
        </Stack>
       
     
   
  );
};

export default Layout;
