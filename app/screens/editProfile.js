import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert, Modal, Platform, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from 'expo-image-picker';

export default function EditProfile() {
  const router = useRouter();
  const { currentUser, isLoading, updateUserProfile } = useAuth();

  const [currentDisplayName, setCurrentDisplayName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [initialDisplayName, setInitialDisplayName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [newPhotoBase64, setNewPhotoBase64] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const nameToSet = currentUser.displayName || currentUser.email.split('@')[0];
      setCurrentDisplayName(nameToSet);
      setInitialDisplayName(nameToSet);
      setCurrentEmail(currentUser.email);
      setInitialEmail(currentUser.email);
    }
  }, [currentUser]);

  const requestCameraPermissionsAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Kamera kullanımı için izin vermeniz gerekiyor.');
        return false;
      }
      return true;
    }
    return true; // Assume web doesn't need explicit permission here or handles it differently
  };

  const requestMediaLibraryPermissionsAsync = async () => {
    if (Platform.OS !== 'web') {
      console.log('[EditProfile.js] Requesting media library permissions...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('[EditProfile.js] Media library permission status:', status);
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Galeriye erişim için izin vermeniz gerekiyor.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    setIsModalVisible(false);
    const hasPermission = await requestCameraPermissionsAsync();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setNewPhotoBase64(result.assets[0].base64);
    }
  };

  const handleChooseFromGallery = async () => {
    setIsModalVisible(false);
    console.log('[EditProfile.js] handleChooseFromGallery called');
    const hasPermission = await requestMediaLibraryPermissionsAsync();
    console.log('[EditProfile.js] Has media library permission:', hasPermission);
    if (!hasPermission) return;

    try {
      console.log('[EditProfile.js] Launching image library...');
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      console.log('[EditProfile.js] Image library result:', JSON.stringify(result));

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setNewPhotoBase64(result.assets[0].base64);
        console.log('[EditProfile.js] New photo base64 set.');
      } else {
        console.log('[EditProfile.js] Image selection canceled or no assets.');
      }
    } catch (error) {
      console.error('[EditProfile.js] Error launching image library:', error);
      Alert.alert('Hata', 'Galeri açılırken bir sorun oluştu.');
    }
  };

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" color="#F49939" /></View>;
  }

  if (!currentUser) {
    router.replace("/screens/Login"); 
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>Lütfen giriş yapın.</Text></View>; 
  }

  const handleSaveChanges = async () => {
    const displayNameChanged = currentDisplayName !== initialDisplayName;
    const emailChanged = currentEmail !== initialEmail;
    const photoChanged = newPhotoBase64 !== null;

    if (!displayNameChanged && !emailChanged && !photoChanged) {
      Alert.alert("Değişiklik Yok", "Herhangi bir değişiklik yapılmadı.", [{ text: "Tamam", onPress: () => router.push("/screens/Profile") }]);
      return;
    }

    const dataToUpdate = {};
    if (displayNameChanged) {
      if (currentDisplayName.trim().length === 0) {
        Alert.alert("Geçersiz İsim", "İsim alanı boş bırakılamaz.");
        return;
      }
      dataToUpdate.displayName = currentDisplayName.trim();
    }

    if (emailChanged) {
      if (!currentEmail.includes('@') || currentEmail.trim().length < 5) {
        Alert.alert("Geçersiz E-posta", "Lütfen geçerli bir e-posta adresi girin.");
        return;
      }
      dataToUpdate.email = currentEmail.trim();
    }
    
    if (photoChanged) {
      dataToUpdate.photoBase64 = newPhotoBase64;
    }

    if (Object.keys(dataToUpdate).length === 0) {
         Alert.alert("Değişiklik Yok", "Herhangi bir geçerli değişiklik yapılmadı.", [{ text: "Tamam", onPress: () => router.push("/screens/Profile") }]);
        return;
    }

    const result = await updateUserProfile(initialEmail, dataToUpdate);
    
    Alert.alert(
      result.success ? "Başarılı" : "Hata", 
      result.message,
      [{ text: "Tamam", onPress: () => {
          if(result.success) {
            setInitialDisplayName(currentDisplayName.trim());
            setInitialEmail(currentEmail.trim());
            if (dataToUpdate.photoBase64) {
                setNewPhotoBase64(null); 
            }
          }
          router.push("/screens/Profile");
      }}]
    );
  };

  const imageSource = newPhotoBase64
    ? { uri: `data:image/jpeg;base64,${newPhotoBase64}` }
    : currentUser?.photoBase64
    ? { uri: `data:image/jpeg;base64,${currentUser.photoBase64}` }
    : require("../../assets/images/women.png");

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Profili Düzenle
        </Text>
      </View>

    
      <View style={styles.profileImageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={() => setIsModalVisible(true)}>
            <Icon name="camera" size={18} color="#A2A2A7" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profil Fotoğrafı Seç</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto}>
              <Text style={styles.modalButtonText}>Kamerayı Kullan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleChooseFromGallery}>
              <Text style={styles.modalButtonText}>Galeriden Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setIsModalVisible(false)}>
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>İsim Soyisim</Text>
        <View style={styles.inputRow}>
          <Icon name="user" size={18} color="#A2A2A7" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Adınızı girin"
            value={currentDisplayName}
            onChangeText={setCurrentDisplayName}
          />
        </View>
      </View>
      <View style={styles.divider}></View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email Adres</Text>
        <View style={styles.inputRow}>
          <Icon name="mail" size={18} color="#A2A2A7" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="E-posta adresinizi girin"
            value={currentEmail}
            onChangeText={setCurrentEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.inputGroupLocation}>
        <Text style={styles.inputLabel}>Konum Bilgisi</Text>
        <View style={styles.inputRow}>
          <Icon name="map-pin" size={18} color="#A2A2A7" style={styles.inputIcon} />
          <Text style={styles.locationText}>
            Trakya Üniversitesi / Uygulamalı Bilimler Fakültesi / Edirne
          </Text>
        </View>
      </View>

   
      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}> 
        <LinearGradient
          colors={["#F6D107", "#F49939"]}
          style={styles.gradientButton}
        >
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 64, // Tailwind mt-16
    paddingHorizontal: 24, // Tailwind px-6
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, // Tailwind mb-6
  },
  backButton: {
    padding: 8, // Tailwind p-2
    backgroundColor: 'white',
    borderRadius: 9999, // Tailwind rounded-full
  },
  headerTitle: {
    fontSize: 20, // Tailwind text-lg, text-[20px]
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 48, // Tailwind mr-12 (compensate for back button width for centering)
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 24, // Tailwind mb-6
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 128, // Tailwind w-32
    height: 128, // Tailwind h-32
    borderRadius: 9999, // Tailwind rounded-full
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 4, // Tailwind bottom-1
    right: 4,  // Tailwind right-1
    backgroundColor: 'white',
    padding: 8, // Tailwind p-2
    borderRadius: 9999, // Tailwind rounded-full
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#F49939',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#A2A2A7',
  },
  cancelButtonText: {
    color: 'white',
  },
  inputGroup: {
    paddingVertical: 16, // Tailwind p-4
    borderRadius: 12,    // Tailwind rounded-xl
    marginBottom: 16,    // Tailwind mb-4
  },
  inputGroupLocation: {
    paddingVertical: 16, // Tailwind p-4
    borderRadius: 12,    // Tailwind rounded-xl
    marginBottom: 32,    // Tailwind mb-8
  },
  inputLabel: {
    color: '#A2A2A7',
    marginBottom: 4, // Tailwind mb-1
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4, // Tailwind top-1
  },
  inputIcon: {
    marginRight: 8, // Tailwind mr-2
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  locationText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB', // Tailwind border-gray-300
  },
  saveButton: {
    width: '100%',
    height: 48, // Tailwind h-12
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    borderRadius: 9999, // Tailwind rounded-full
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18, // Tailwind text-lg
  },
});