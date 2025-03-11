import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function NotificationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <View className="flex-1 bg-[#F5F5F5] mt-16">
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full ">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-center text-[20px] text-black">Bilgilendirme</Text>
      </View>

      <ScrollView className="flex-1 px-5 py-2">
      <Image
                    source={require("../../assets/images/recycling.jpg")}
                    className="h-40 w-full rounded-xl"
                  />


       
        <View className="flex-row items-center bg-white p-2 rounded-xl border border-[#D9D9D9]  mt-3">
          <Icon name="calendar" size={18} color="#FFA500" />
          <Text className="ml-2 font-bold text-[#C7C7C7]">{params.date}</Text>
        </View>

   
        <Text className="text-xl font-bold mt-4 text-black">{params.title}</Text>

       
        <Text className="text-gray-700 text-base mt-2 leading-6">{params.details}</Text>

       
        <Text className="text-gray-600 text-sm mt-5">
          <Text className="font-semibold text-black">Yazan: </Text> {params.author}
        </Text>
      </ScrollView>
    </View>
  );
}