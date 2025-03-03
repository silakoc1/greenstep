import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import "../../global.css";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Register() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [openFaculty, setOpenFaculty] = useState(false);
  const [valueFaculty, setValueFaculty] = useState(null);
  const [itemsFaculty, setItemsFaculty] = useState([
    { label: 'Arda Meslek Yüksekokulu', value: 'Arda Meslek Yüksekokulu' },
    { label: 'Eczacılık Fakültesi', value: 'Eczacılık Fakültesi' },
    { label: 'Edebiyat Fakültesi', value: 'Edebiyat Fakültesi' },
    { label: 'Eğitim Fakültesi', value: 'Eğitim Fakültesi' },
    { label: 'Uygulamalı Bilimler Fakültesi', value: 'Uygulamalı Bilimler Fakültesi' }
  ]);

  const [openDepartment, setOpenDepartment] = useState(false);
  const [valueDepartment, setValueDepartment] = useState(null);
  const [itemsDepartment, setItemsDepartment] = useState([
    { label: 'Finans ve Bankacılık ', value: 'Finans ve Bankacılık' },
    { label: 'Turizm İşletmeciliği ', value: 'Turizm İşletmeciliği ' },
    { label: 'Yönetim Bilişim Sistemleri', value: 'Yönetim Bilişim Sistemleri' }
  ]);

  const router = useRouter();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View className="flex-1 items-center bg-white">
      <FlatList
        data={[{ key: 'form' }]}
        renderItem={() => (
          <View>
            <View className="items-center justify-center">
              <Image
                source={require("../../assets/logo2.png")}
                style={{
                  width: wp("35%"),
                  height: hp("35%"),
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            </View>

            <View className="bottom-20">
              <Text className="font-poppinsMedium text-[30px] text-center">Hesap Oluştur</Text>
              <Text className="text-[14px] font-poppinsRegular text-[#737373] mt-1 text-center">
                Bilgilerinizi girip kayıt olun.
              </Text>
            </View>

            <View className="w-full gap-6 bottom-8 p-4">
              <View className="flex-col mx-4 mt-2">
                <Text className="text-[#111111] font-poppinsRegular text-[14px] bottom-2 left-3">Email</Text>
                <View className="flex-row items-center bg-[#EDEDEDA6] rounded-[16px] mt-1 h-[50px] pl-3 w-full">
                  <TextInput
                    className="flex-1"
                    placeholder="silakoc@gmail.com"
                    placeholderTextColor="#000000"
                  />
                  <View className="right-3">
                    <Image
                      source={require("../../assets/images/mail 1.png")}
                      className="h-6 w-6"
                    />
                  </View>
                </View>
              </View>

              <View className="flex-col mx-4 mt-5">
                <Text className="text-[#111111] font-poppinsRegular text-[14px] bottom-2 left-3">Şifre</Text>
                <View className="flex-row items-center bg-[#EDEDEDA6] rounded-[16px] mt-1 h-[50px] pl-3 w-full">
                  <TextInput
                    className="flex-1"
                    placeholder="*"
                    placeholderTextColor="#000000"
                    secureTextEntry={secureTextEntry}
                  />
                  <TouchableOpacity className="right-3" onPress={toggleSecureEntry}>
                    <Icon
                      name={secureTextEntry ? "eye-off" : "eye"}
                      size={20}
                      color="#A5A5A5"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-col mx-4 mt-5">
                <Text className="text-[#111111] font-poppinsRegular text-[14px] bottom-2 left-3">Fakülteni seç</Text>
                <DropDownPicker
                  open={openFaculty}
                  value={valueFaculty}
                  items={itemsFaculty}
                  setOpen={setOpenFaculty}
                  setValue={setValueFaculty}
                  setItems={setItemsFaculty}
                  placeholder="Seçiniz..."
                  style={{
                    backgroundColor: '#EDEDEDA6',
                    borderRadius: 16,
                    height: 50,
                    paddingLeft: 10,
                    borderWidth: 0,
                  }}
                  textStyle={{
                    color: '#000000',
                    fontFamily: 'Poppins_400Regular',
                  }}
                  dropDownContainerStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#F2F4F7',
                  }}
                  dropDownDirection="BOTTOM"
                />
              </View>

              {valueFaculty === 'Uygulamalı Bilimler Fakültesi' && (
                <View className="flex-col mx-4 mt-5">
                  <Text className="text-[#111111] font-poppinsRegular text-[14px] bottom-2 left-3">Bölümünü seç</Text>
                  <DropDownPicker
                    open={openDepartment}
                    value={valueDepartment}
                    items={itemsDepartment}
                    setOpen={setOpenDepartment}
                    setValue={setValueDepartment}
                    setItems={setItemsDepartment}
                    placeholder="Seçiniz..."
                    style={{
                      backgroundColor: '#EDEDEDA6',
                      borderRadius: 16,
                      height: 50,
                      paddingLeft: 10,
                      borderWidth: 0,
                    }}
                    textStyle={{
                      color: '#000000',
                      fontFamily: 'Poppins_400Regular',
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#F2F4F7',
                    }}
                    dropDownDirection="BOTTOM"
                  />
                </View>
              )}

              <View className="flex-col mx-4 mt-10">
                <LinearGradient colors={["#F6D107", "#F49939"]} style={{ borderRadius: 16 }}>
                  <TouchableOpacity
                    className="h-[50px] items-center justify-center"
                    onPress={() => router.push("/screens/Login")}
                  >
                    <Text className="text-white font-poppinsSemiBold text-center text-[16px]">Kayıt Ol</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View className="mt-6">
                <View className="flex-row m-auto justify-center">
                  <Text className="text-[#7C7C7C] font-poppinsRegular text-[13px]">
                    Zaten bir hesabınız var mı?
                  </Text>
                  <TouchableOpacity className="justify-center items-center ml-1">
                    <Text
                      className="text-[#F49939] font-poppinsMedium text-[13px]"
                      onPress={() => router.push("/screens/Login")}
                    >
                      Giriş Yap
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
}