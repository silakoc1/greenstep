import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter } from 'expo-router';
import "../../global.css";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SigninScreen() {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const router = useRouter();
    
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    
    return (
        <View className="flex-1 items-center justify-start bg-white bottom-10">
            <View className="items-center justify-center">
                <Image
                    source={require("../../assets/logo2.png")}
                    style={{
                        width: wp('35%'),
                        height: hp('35%'),
                        alignSelf: 'center',
                    }}
                    resizeMode="contain"
                />
            </View>
            
            <View className="bottom-16 ">
                <Text className="font-bold text-[30px] text-center">Kayıt Ol</Text>
                <Text className="text-[14px] text-[#737373] mt-1 text-center">Hoş Geldiniz.</Text>
            </View>
            
            <View className="w-full mt-2">
                <View className="flex-col mx-4 mt-2">
                    <Text className="text-[#111111] text-[14px] left-3">E-posta</Text>
                    <TextInput 
                        className="bg-[#EDEDED] rounded-[15px] mt-1 h-[50px] pl-3 w-full" 
                        placeholder="E-posta adresinizi giriniz" 
                        placeholderTextColor="#737373" 
                    />
                </View>
                
                <View className="flex-col mx-4 mt-5">
                    <Text className="text-[#111111] text-[15px] left-3">Şifre</Text>
                    <View className="flex-row items-center bg-[#EDEDED] rounded-[12px] mt-1 h-[50px] pl-3 w-full">
                        <TextInput
                            className="flex-1"
                            placeholder="*"
                            placeholderTextColor="#737373"
                            secureTextEntry={secureTextEntry}
                        />
                        <TouchableOpacity className="right-2" onPress={toggleSecureEntry}>
                            <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} color="#737373" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[#F49939] text-[13px] mt-1 ml-auto">Şifreni mi unuttun?</Text>
                </View>
                
                <View className="flex-col mx-4 mt-10">
                    <TouchableOpacity 
                        className="bg-[#F49939] rounded-[15px] h-[50px] items-center justify-center " 
                        onPress={() => router.push('/home')}
                    >
                        <Text className="text-white text-[14px]">Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
                
              
                
                <View className="mt-6">
                    <View className="flex-row m-auto justify-center">
                        <Text className="text-[#7C7C7C] text-[13px]">Hesabınız yok mu?</Text>
                        <TouchableOpacity className="justify-center items-center ml-1">
                            <Text 
                                className="text-[#F49939] text-[13px]" 
                                onPress={() => router.push('/create-account')}
                            >
                                Kayıt Ol
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}