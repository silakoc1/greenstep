import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomNavigation from "../components/BottomNavigation";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      {/* Sabit Üst Kısım */}
      <View className="mt-10 top-8 px-4 flex-row items-center justify-between">
        <Image
          source={require("../../assets/images/marker.png")}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <View className="items-start right-16">
          <Text className="font-poppinsMedium text-[12px] text-[#000000] text-center">
            Trakya Üniversitesi
          </Text>
          <Text className="font-poppinsThin text-[12px] text-[#000000] text-center">
            Uygulamalı Bilimler Fakültesi
          </Text>
        </View>
        <Image
          source={require("../../assets/images/women.png")}
          className="w-12 h-12"
          resizeMode="contain"
        />
      </View>

      {/* **ScrollView Başlangıcı (Arama Çubuğu ile Başlıyor!)** */}
      <ScrollView className="flex-1 mt-16">
        {/* Arama Çubuğu */}
        <View className="self-center w-[352px] h-[64px] mb-4">
          <View
            style={{
              backgroundColor: "#E5E5E5A8",
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/search-icon.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: "#666",
                marginRight: 8,
              }}
            />
            <TextInput
              className="text-[13px] font-poppinsRegular"
              placeholder="Herhangi bir şey ara..."
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* **Greenstep Banner** */}
        <View className="items-center">
          <ImageBackground
            source={require("../../assets/images/dummy.png")}
            className="w-[362px] h-[189px] justify-center items-center"
            resizeMode="cover"
          >
            <View className="items-start right-24 top-4">
              <Text className="text-white text-[20px] font-poppinsSemiBold">
                Greenstep:
              </Text>
              <Text className="text-white text-[20px] font-poppinsRegular">
                Küçük adımlarla {"\n"}büyük bir dünyayı{"\n"}kurtar!
              </Text>
            </View>
          </ImageBackground>

          {/* **Keşfet Bölümü** */}
          <View className="mt-6 self-start left-8">
            <Text className="text-[20px] font-poppinsRegular">Keşfet</Text>
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity className="rounded-[16px]">
                <LinearGradient
                  colors={["#F6D107", "#F49939"]}
                  style={{ borderRadius: 16, width: 172, height: 133 }}
                >
                  <Image
                    source={require("../../assets/images/chart.png")}
                    className="w-[54px] h-[54px] self-center mt-2"
                    resizeMode="contain"
                  />
                  <Text className="text-white mt-4 text-[12px] text-center font-poppinsMedium">
                    Fakülte Puan {"\n"}Sıralamaları ve {"\n"}Kazanılan Rozetler
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity className="rounded-[16px]"  onPress={() => router.push("/screens/QrcodeScanner")} >
                <LinearGradient
                  colors={["#77AD19", "#51652D"]}
                  style={{ borderRadius: 16, width: 172, height: 133 }}
                >
                  <Image
                    source={require("../../assets/images/qr.png")}
                    className="w-[45px] h-[45px] self-center mt-4"
                    resizeMode="contain"
                  />
                  <Text className="text-white text-[16px] mt-10 text-center font-poppinsMedium">
                    QR Kodu Okut
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* **Sürdürülebilirlik Bölümü** */}
          <View className="mt-8 self-start left-8">
            <Text className="text-[20px] font-poppinsRegular">
              Neden Sürdürülebilirlik?
            </Text>
            <ImageBackground
              source={require("../../assets/images/dummy_4.png")}
              className="w-[350px] h-[178px] justify-center mt-3 items-center"
              resizeMode="cover"
            >
              <View className="justify-end self-end right-6">
                <Text className="text-white top-12 text-[20px] font-poppinsMedium">
                  Doğayı Sev,{"\n"}Yaşamayı Sev.
                </Text>
              </View>
            </ImageBackground>
          </View>
         
        </View>
       
      </ScrollView>
     <BottomNavigation />
    </View>
    
  );
}
