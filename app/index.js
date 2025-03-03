import React, { useEffect } from "react";
import { View, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

const App = () => {
  const router = useRouter();
  
  
    
    
  return (
    <SafeAreaView className="flex-1 h-full ">
     
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/logo.png")}
          style={{
            width: wp('80%'),
            height: hp('40%'),
            alignSelf: 'center',
            marginBottom: hp('10%')
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;