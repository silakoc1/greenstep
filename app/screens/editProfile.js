import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function editProfile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F5F5F5] mt-16 px-6">
  
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-[20px] text-center mr-12">
          Profili Düzenle
        </Text>
      </View>

    
      <View className="items-center mb-6">
        <View className="relative">
          <Image
            source={require("../../assets/images/women.png")}
            className="w-32 h-32 rounded-full"
          />
          <TouchableOpacity className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow">
            <Icon name="camera" size={18} color="#A2A2A7" />
          </TouchableOpacity>
        </View>
      </View>

    
      <View className=" p-4 rounded-xl mb-4 ">
        <Text className="text-[#A2A2A7] mb-1">İsim Soyisim</Text>
        <View className="flex-row items-center top-1">
          <Icon name="user" size={18} color="#A2A2A7" className="mr-2  " />
          <TextInput
            className="flex-1 text-black"
            placeholder="Adınızı girin"
            defaultValue="Sıla Koç"
          />
        </View>
      </View>
      <View className="border-b border-gray-300"></View>

      <View className=" p-4 rounded-xl mb-4">
        <Text className="text-[#A2A2A7] mb-1">Email Adres</Text>
        <View className="flex-row items-center top-1">
          <Icon name="mail" size={18} color="#A2A2A7" className="mr-2" />
          <TextInput
            className="flex-1 text-black"
            placeholder="E-posta adresinizi girin"
            defaultValue="silakoc@trakya.edu.tr"
            keyboardType="email-address"
          />
        </View>
      </View>
      <View className="border-b border-gray-300"></View>
      <View className=" p-4 rounded-xl mb-8">
        <Text className="text-[#A2A2A7] mb-1">Konum Bilgisi</Text>
        <View className="flex-row items-center top-1">
          <Icon name="map-pin" size={18} color="#A2A2A7" className="mr-2" />
          <Text className="flex-1 text-black">
            Trakya Üniversitesi / Uygulamalı Bilimler Fakültesi / Edirne
          </Text>
        </View>
      </View>

   
      <TouchableOpacity className="mt-4 mb-12 "> 
        <LinearGradient
          colors={["#F6D107", "#F49939"]}
          className="p-4  rounded-full items-center "
        >
          <Text className="text-white font-bold text-center text-lg">Kaydet</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}