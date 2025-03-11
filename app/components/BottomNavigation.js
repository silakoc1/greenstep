import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home'); // Başlangıçta 'home' tab'ini seçili yapıyoruz

  useEffect(() => {
    if (pathname.includes('HomeScreen')) {
      setActiveTab('home');
    } else if (pathname.includes('Profile')) {
      setActiveTab('profile');
    } else if (pathname.includes('MapScreen')) {
      setActiveTab('map');
    } else if (pathname.includes('Notification')) {
      setActiveTab('notification');
    }
  }, [pathname]); // pathname değiştiğinde activeTab güncelleniyor

  const handlePress = (screen, tabName) => {
    setActiveTab(tabName); // İlgili sekmeyi aktif yapıyoruz
    router.push(screen);  // Yönlendirme yapıyoruz
  };

  return (
    <View className="flex-row bg-white py-3 w-full h-[70px] border-t border-[#E5E7EB] justify-between items-center px-4">
      
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('../../screens/HomeScreen', 'home')} // '/home' sayfasına yönlendir
      >
        <View
          className={`w-[40px] h-[40px] rounded-full justify-center items-center ${activeTab === 'home' ? 'bg-[#FDEFE0]' : 'bg-transparent'}`}
        >
          <Image
            source={
              activeTab === 'home'
                ? require('../../assets/images/color_home.png')
                : require('../../assets/images/home.png')
            }
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('../../screens/MapScreen', 'map')} // '/map' sayfasına yönlendir
      >
        <View
          className={`w-[40px] h-[40px] rounded-full justify-center items-center ${activeTab === 'map' ? 'bg-[#FDEFE0]' : 'bg-transparent'}`}
        >
          <Image
            source={
              activeTab === 'map'
                ? require('../../assets/images/color_map.png')
                : require('../../assets/images/map.png')
            }
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('../../screens/Notification', 'notification')} // '/notification' sayfasına yönlendir
      >
        <View
          className={`w-[40px] h-[40px] rounded-full justify-center items-center ${activeTab === 'notification' ? 'bg-[#FDEFE0]' : 'bg-transparent'}`}
        >
          <Image
            source={
              activeTab === 'notification'
                ? require('../../assets/images/color_info.png')
                : require('../../assets/images/info.png')
            }
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('../../screens/Profile', 'profile')} // '/profile' sayfasına yönlendir
      >
        <View
          className={`w-[40px] h-[40px] rounded-full justify-center items-center ${activeTab === 'profile' ? 'bg-[#FDEFE0]' : 'bg-transparent'}`}
        >
          <Image
            source={
              activeTab === 'profile'
                ? require('../../assets/images/color_profile.png')
                : require('../../assets/images/profile.png')
            }
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default BottomNavigation;
