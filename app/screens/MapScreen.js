import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import BottomNavigation from "../components/BottomNavigation";

export default function FloorSketchOne() {
  const router = useRouter();
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);

  const floors = ["Zemin Kat", "1. Kat", "2. Kat"];

  const floorImages = {
    "Zemin Kat": require("../../assets/zemin-kat.png"),
    "1. Kat": require("../../assets/birinci-kat.png"),
    "2. Kat": require("../../assets/ikinci-kat.png"),
   
  };

  const handleSelectFloor = (floor) => {
    setSelectedFloor(floor);
    setShowButton(true);
    setDropdownOpen(false);
    setShowFloorPlan(false);
  };

  const handleFindFloor = () => {
    setShowFloorPlan(true);
  };

  return (
    
    <View className="flex-1 bg-[#F5F5F5] mt-16 p-4">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-white">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-col m-auto">
          <Text className="text-lg font-medium text-center">Uygulamalı Bilimler Fakültesi</Text>
          <Text className="text-lg font-medium text-center">Kat Krokisi</Text>
        </View>
      </View>

      {/* Dropdown */}
      <View className="mt-5 rounded-xl bg-white">
        <TouchableOpacity
          className="p-4 flex-row justify-between h-14 items-center"
          onPress={() => setDropdownOpen(!dropdownOpen)}
        >
          <Text className="text-md text-gray-500">
            {selectedFloor ? selectedFloor : "Fakültenizin Geri Dönüşüm Noktasını Seçin"}
          </Text>
          <Icon name={dropdownOpen ? "chevron-up" : "chevron-down"} size={22} color="#A5A5A5" />
        </TouchableOpacity>

        {dropdownOpen && (
          <View className="border-t border-gray-300">
            {floors.map((floor, index) => (
              <TouchableOpacity
                key={index}
                className={`p-3 ${selectedFloor === floor ? "bg-orange-100" : ""}`}
                onPress={() => handleSelectFloor(floor)}
              >
                <Text className="text-lg">{floor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* "Katı Bul" Butonu */}
      {showButton && (
        <TouchableOpacity className="mt-4 bg-[#F49939] p-3 rounded-2xl h-14" onPress={handleFindFloor}>
          <Text className="text-white m-auto font-bold">Katı Bul</Text>
        </TouchableOpacity>
      )}

      {/* Seçilen Kat Planı */}
      {showFloorPlan && selectedFloor && (
        <View className="mt-4 bg-white p-4 rounded-xl">
          <Text className="text-md font-medium mb-3">{selectedFloor} Planı</Text>
          <Image
            source={floorImages[selectedFloor]}
            className="w-full h-64 rounded-lg"
            resizeMode="contain"
          />
        </View>
      )}
      <View className=" top-[75%] "> 
      <BottomNavigation  />

    </View >
    
    </View>
    
  );
}
