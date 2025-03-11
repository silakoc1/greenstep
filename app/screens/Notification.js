import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import BottomNavigation from "../components/BottomNavigation";

export default function Notification() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      date: "14.07.2024",
      title: "Geri Dönüşüm Nedir ve Neden Önemlidir?",
      details:
        "Geri dönüşüm, atık malzemelerin yeniden işlenerek tekrar kullanılabilir hale getirilmesi sürecidir. Plastik, kağıt, metal, cam ve organik atıklar gibi çeşitli malzemeler geri dönüştürülebilir. Bu süreç, doğal kaynakların korunması, enerji tasarrufu sağlanması ve çevre kirliliğinin azaltılması açısından büyük önem taşır.",
      author: "Sıla Koç",
      image: require("../../assets/images/recycling.jpg"),
    },
    {
        id: 2,
        date: "14.07.2024",
        title: "Geri Dönüşüm Nedir ve Neden Önemlidir?",
        details:
          "Geri dönüşüm, atık malzemelerin yeniden işlenerek tekrar kullanılabilir hale getirilmesi sürecidir. Plastik, kağıt, metal, cam ve organik atıklar gibi çeşitli malzemeler geri dönüştürülebilir. Bu süreç, doğal kaynakların korunması, enerji tasarrufu sağlanması ve çevre kirliliğinin azaltılması açısından büyük önem taşır.",
        author: "Sıla Koç",
        image: require("../../assets/images/recycling.jpg"),
      },
  ];

  return (
    <View className="flex-1 bg-[#F5F5F5] mt-16">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white rounded-full">
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold flex-1 text-[20px] text-center">Bilgilendirme</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-2">
        {notifications.map((item) => (
          <View key={item.id} className="bg-white rounded-2xl   p-4 mb-4">
            <Image source={item.image} className="w-full h-40 rounded-xl" resizeMode="cover" />

            <View className="flex-row items-center mt-3 rounded-lg p-1 h-8 border border-[#D9D9D9]">
              <Icon name="calendar" size={16} color="#FF8200" />
              <Text className="ml-2 text-[#C7C7C7] font-bold">{item.date}</Text>
            </View>

            <Text className="text-base font-bold mt-3">{item.title}</Text>

           
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/screens/notificationDetails",
                  params: {
                    title: item.title,
                    date: item.date,
                    details: item.details,
                    author: item.author,
                    image: item.image,
                  },
                })
              }
            >
              <Text className="text-gray-500 text-sm mt-2">
                {item.details.slice(0, 80)}...{" "}
                <Text className="text-orange-500 font-semibold">devamı..</Text>
              </Text>
            </TouchableOpacity>

            <Text className="text-gray-600 text-sm mt-2">
              <Text className="font-semibold">Yazan:</Text> {item.author}
            </Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}