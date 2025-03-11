import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";

export default function ScoreRanking() {
  const router = useRouter();

  
  const users = [
    { id: 1, name: "Minel Sevgen", department: "Yönetim Bilişim Sistemleri", points: 370, image: require("../../assets/images/women.png") },
    { id: 2, name: "Yağmur Çoban", department: "Yönetim Bilişim Sistemleri", points: 355, image: require("../../assets/images/women.png") },
  ];

  return (
    <View className="flex-1 bg-[#F5F5F5] mt-16">
   
      <View className="flex-row items-center px-4 py-3 ">
        <TouchableOpacity  onPress={() => router.back()} className="p-2 rounded-full mb-4 bg-white">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center">
          Uygulamalı Bilimler Fakültesi Puan Sıralaması
        </Text>
      </View>

      
      <ScrollView className="flex-1 px-4">
        {users.map((user, index) => (
          <View key={user.id} className="flex-row items-center border-b border-gray-300 p-4">
            <Image source={user.image} className="w-12 h-12 rounded-full" />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold">{user.name}</Text>
              <Text className="text-gray-500 text-sm">{user.department}</Text>
            </View>
            <Text className="text-black font-bold">{user.points} puan</Text>
          </View>
        ))}
      </ScrollView>

     
      <TouchableOpacity  onPress={() => router.push("/screens/earnedBadges")}  className="bg-[#FF8200] p-4 rounded-lg items-center mx-6 mb-12 ">
        <Text className="text-white font-semibold">Fakültede Kazanılan Rozetler</Text>
      </TouchableOpacity>
    </View>
  );
}