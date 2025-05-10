import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigation from "../components/BottomNavigation";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const router = useRouter();
  const { currentUser, isLoading, logout } = useAuth();

  console.log("[Profile.js] Rendering with currentUser email:", currentUser?.email);

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" color="#F49939" /></View>;
  }

  if (!currentUser) {
    router.replace("/screens/Login"); 
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Lütfen giriş yapın.</Text></View>; 
  }

  const handleLogout = () => {
    logout();
    router.replace("/screens/Login");
  };
  
  const displayName = currentUser.displayName || currentUser.email.split('@')[0];
  const departmentInfo = "Yönetim Bilişim Sistemleri\nUygulamalı Bilimler Fakültesi";

  const profileImageSource = currentUser?.photoBase64
    ? { uri: `data:image/jpeg;base64,${currentUser.photoBase64}` }
    : require("../../assets/images/women.png");

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
            source={profileImageSource}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <Text className="text-xl font-bold mt-2">{displayName}</Text>
          <Text className="text-[#7C7C7C] text-center mt-1">
            {currentUser.email}
            {"\n"}
            {departmentInfo}
          </Text>
        </View>

        {/* İstatistikler */}
        <View className="flex-row justify-center gap-2 mb-6">
          <LinearGradient colors={["#F6D107", "#F49939"]} style={{ borderRadius: 12, width: '30%', alignItems: 'center' }}>
            <View className="p-3 items-center">
              <Text className="text-lg text-white font-bold">--</Text>
              <Text className="text-semibold text-white">Rozet</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#77AC1A", "#566E2B"]} style={{ borderRadius: 12, width: '30%', alignItems: 'center' }}>
            <View className="p-3 items-center">
              <Text className="text-lg font-bold text-white">--</Text>
              <Text className="text-semibold text-white">Puan</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={["#F6D107", "#F49939"]} style={{ borderRadius: 12, width: '30%', alignItems: 'center' }}>
            <View className="p-3 items-center">
              <Text className="text-lg font-bold text-white">--</Text>
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
          <TouchableOpacity
              className="flex-row items-center p-4 rounded-lg mb-2 bg-red-500 shadow-sm mt-4"
              onPress={handleLogout}
            >
              <Icon name="log-out" size={20} color="white" style={{ marginRight: 12 }} />
              <Text className="flex-1 text-[16px] text-white font-semibold">Çıkış Yap</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
      <BottomNavigation />
    </View>
  );
}