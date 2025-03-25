import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function QrCodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission(); // Kamera izni isteme
    }
  }, [permission]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert("QR Kod Tarandı", `Veri: ${data}`);
  };

  if (!permission) {
    return <Text>QR kod tarayıcı için kamera izni kontrol ediliyor...</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Kamera erişimi reddedildi.</Text>
        <Button title="İzin Ver" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Tekrar Tara" onPress={() => setScanned(false)} />
          <Text style={styles.scannedText}>Son Tarama: {scannedData}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 10,
  },
  scannedText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
});
