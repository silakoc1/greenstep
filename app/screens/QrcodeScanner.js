import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Linking, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const TARGET_QR_CODE_DATA = "GREENSTEP_PUAN_ROZET_001";

export default function QrCodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { currentUser, processQrScan } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      Alert.alert(
        "Giriş Gerekli",
        "QR kod okutabilmek için lütfen giriş yapın.",
        [{ text: "Giriş Yap", onPress: () => router.replace('/screens/Login') }],
        { cancelable: false }
      );
      return;
    }

    console.log('[QrCodeScanner] Initial permission status:', permission?.status);
    if (permission?.status === 'undetermined') {
      requestPermission();
    }
  }, [permission, currentUser, router]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`[QrCodeScanner] Barcode with type ${type} and data ${data} has been scanned.`);

    if (!currentUser) {
      Alert.alert("Hata", "Kullanıcı oturumu bulunamadı. Lütfen tekrar giriş yapın.");
      setScanned(false);
      return;
    }

    if (data === TARGET_QR_CODE_DATA) {
      const result = processQrScan(data);
      Alert.alert(
        result.success ? "İşlem Başarılı!" : "İşlem Başarısız",
        result.message,
        [
          {
            text: 'Tekrar Tara',
            onPress: () => setScanned(false),
          },
          {
            text: 'Tamam',
            onPress: () => { 
              setScanned(false);
            },
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Farklı QR Kod",
        `Okunan QR Kod: ${data}\nBu QR kod için bir işlem tanımlanmamıştır.`, 
        [
          {
            text: 'Tekrar Tara',
            onPress: () => setScanned(false),
          },
          {
            text: 'Tamam',
            onPress: () => setScanned(false),
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  if (!currentUser) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Lütfen giriş yapın.</Text>
            <Button title="Giriş Yap" onPress={() => router.replace("/screens/Login")} />
        </View>
    );
  }

  if (permission === null || permission.status === 'undetermined') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni isteniyor...</Text>
        <Button title="Kamera İzni İste" onPress={requestPermission} />
      </View>
    );
  }

  if (permission.status === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Kamera izni reddedildi.</Text>
        {permission.canAskAgain ? (
          <Button title="Tekrar İzin İste" onPress={requestPermission} />
        ) : (
          <Button title="Ayarları Aç (İzin İçin)" onPress={openSettings} />
        )}
        <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Kamera izni verilmedi. Lütfen izin verin.</Text>
            <Button title="İzin İste" onPress={requestPermission} />
            <Button title="Geri Dön" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onError={(error) => {
          console.error('[QrCodeScanner] CameraView Error:', error);
          Alert.alert("Kamera Hatası", "Kamera başlatılırken bir sorun oluştu.");
        }}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button title={'Tekrar Tara'} onPress={() => setScanned(false)} color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});