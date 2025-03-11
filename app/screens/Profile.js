import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigation from "../components/BottomNavigation";

export default function Profile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F5F5F5] mt-16">
      
      {/* Üst Menü */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-[20px] mr-10 text-center">Profil</Text>
      </View>

      {/* ScrollView */}
      <ScrollView className="px-4">
        
        {/* Profil Fotoğrafı ve Bilgileri */}
        <View className="items-center my-6">
          <Image
            source={require("../../assets/images/women.png")}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <Text className="text-xl font-bold mt-2">Sıla Koç</Text>
          <Text className="text-[#7C7C7C] text-center mt-1">Yönetim Bilişim Sistemleri{"\n"}Uygulamalı Bilimler Fakültesi</Text>
        </View>

        {/* İstatistikler */}
        <View className="flex-row justify-center gap-2 mb-6">
          <LinearGradient colors={["#F6D107", "#F49939"]} style={{ borderRadius: 12 }}>
            <View className="p-3 w-24 items-center">
              <Text className="text-lg text-white font-bold">11</Text>
              <Text className="text-semibold text-white">Rozet</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#77AC1A", "#566E2B"]} style={{ borderRadius: 12 }}>
            <View className="p-3 w-24 items-center">
              <Text className="text-lg font-bold text-white">23</Text>
              <Text className="text-semibold text-white">Puan</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#F6D107", "#F49939"]} style={{ borderRadius: 12 }}>
            <View className="p-3 w-24 items-center">
              <Text className="text-lg font-bold text-white">63</Text>
              <Text className="text-white">Dönüşüm</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Menü Listesi */}
        <View>
          {[
            { label: "Profilini Düzenle", icon: "user", screen: "editProfile" },
            { label: "Gizlilik ve Güvenlik", icon: "lock", screen: "privacySecurity" },
            { label: "Puanlama", icon: "plus", screen: "pointRanking" },
            { label: "Rozetler", icon: "star", screen: "earnedBadges" },
            { label: "Fakülteler Arası Sıralaman", icon: "bar-chart", screen: "scoreRanking" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center p-4 rounded-lg mb-2 "
              onPress={() => router.push(`/screens/${item.screen}`)} 
            >
              <Icon name={item.icon} size={20} color="black" style={{ marginRight: 12 }} />
              <Text className="flex-1 text-[16px]">{item.label}</Text>
              <Icon name="chevron-right" size={20} color="black" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      <BottomNavigation />
    </View>
  );
}
