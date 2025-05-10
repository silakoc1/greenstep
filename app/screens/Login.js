import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import "../../global.css";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { login } = useAuth();
  const router = useRouter();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun!");
      return;
    }

    const result = login(email, password);
    Alert.alert(result.success ? "Başarılı" : "Hata", result.message);
    
    if (result.success) {
      router.push("/screens/HomeScreen");
    }
  };

  return (
    <View className="flex-1 items-center  bg-white ">
      <View className="items-center justify-center">
        <Image
          source={require("../../assets/logo2.png")}
          style={{
            width: wp("35%"),
            height: hp("35%"),
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
      </View>

      <View className="bottom-20 ">
        <Text className="font-poppinsMedium text-[30px] text-center">Giriş Yap</Text>
        <Text className="text-[14px] font-poppinsRegular text-[#737373] mt-1 text-center">
          Hoş geldiniz.
        </Text>
      </View>

      <View className="w-full gap-6 bottom-10 p-4">
        <View className="flex-col mx-4 mt-2">
          <Text className="text-[#111111]  font-poppinsRegular text-[14px] bottom-2 left-3">Email</Text>
          <View className="flex-row items-center bg-[#EDEDEDA6] rounded-[16px] mt-1 h-[50px] pl-3 w-full">
            <TextInput
              className="flex-1"
              placeholder="silakoc@gmail.com"
              placeholderTextColor="#000000"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View className="right-3">
              <Image
                source={require("../../assets/images/mail 1.png")}
                className="h-6 w-6"
              />
            </View>
          </View>
        </View>

        <View className="flex-col mx-4 mt-5">
          <Text className="text-[#111111]  font-poppinsRegular text-[14px] bottom-2 left-3">Şifre</Text>
          <View className="flex-row items-center bg-[#EDEDEDA6] rounded-[16px] mt-1 h-[50px] pl-3 w-full">
            <TextInput
              className="flex-1"
              placeholder="*"
              placeholderTextColor="#000000"
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity className="right-3" onPress={toggleSecureEntry}>
              <Icon
                name={secureTextEntry ? "eye-off" : "eye"}
                size={20}
                color="#A5A5A5"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-[#F49939] font-poppinsRegular text-[13px] self-end top-5 right-1">
            Şifreni mi unuttun?
          </Text>
        </View>

        <View className="flex-col mx-4 mt-10">
            <LinearGradient colors={["#F6D107", "#F49939"]} style={{borderRadius: 16}}>
          <TouchableOpacity
              className="h-[50px] items-center justify-center"
              onPress={handleLogin}
          >
            <Text className="text-white font-poppinsSemiBold text-center text-[16px]">Giriş Yap</Text>
          </TouchableOpacity>
          </LinearGradient>
        </View>

        <View className="mt-6">
          <View className="flex-row m-auto justify-center">
            <Text className="text-[#7C7C7C] font-poppinsRegular text-[13px]">
              Hesabınız yok mu?
            </Text>
            <TouchableOpacity className="justify-center items-center ml-1">
              <Text
                className="text-[#F49939] font-poppinsMedium text-[13px]"
                onPress={() => router.push("/screens/Register")}
              >
                Kayıt Ol
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
