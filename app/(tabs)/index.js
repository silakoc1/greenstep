import React, { useEffect } from "react";
import { View, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {

      router.replace('/screens/signin');
   
      
      console.log("Timer completed, attempting navigation");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-[#E94057]">
      <StatusBar backgroundColor="#E94057" barStyle="light-content" hidden={true} />
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: wp('80%'),
            height: hp('40%'),
            alignSelf: 'center',
            marginTop: hp('10%'),
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;