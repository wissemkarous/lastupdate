import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, SafeAreaView, View, StatusBar, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

export default function App() {
  const [reload, setReload] = useState(false);
  const [bienvenu, setBienvenu] = useState(true);
  const [nouveau, setNouveau] = useState(false);
  const [show, setShow] = useState(false);
  const [nom, setNom] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [departMessage, setDepartMessage] = useState("");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const captureImage = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 0.5,
        base64: true,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setShow(false);
      setReload(true);
      setDepartMessage("Image captured, processing...");
      setCapturedImage(newPhoto.uri);
      const formData = new FormData();
      formData.append("filee", newPhoto.base64);
      axios.post("http://192.168.1.13:4000/stat", formData).then((res) => {
        setNom(res.data.aya);
        setNouveau(true);
        setReload(false);
        setDepartMessage("");
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundContainer}>
        {show ? (
          <Camera
            autoFocus={Camera.Constants.AutoFocus.off}
            ref={cameraRef}
            style={styles.camera}
            type={type}
          />
        ) : null}
        {capturedImage ? (
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        ) : null}
      </View>
      {bienvenu ? (
        <TouchableOpacity
          onPress={() => {
            setShow(true);
            setBienvenu(false);
          }}
          style={styles.startButton}
        >
          <MaterialIcons name="play-arrow" size={30} color="white" />
        </TouchableOpacity>
      ) : null}
      {nouveau ? (
        <TouchableOpacity
          style={styles.auth}
          onPress={() => {
            setNom("");
            setCapturedImage(null);
            setShow(true);
            setNouveau(false);
          }}
        >
          <Text style={styles.authText}>Nouveau</Text>
        </TouchableOpacity>
      ) : null}
      {nom !== "" ? <Text style={styles.bienvenueText}>Bienvenue {nom}</Text> : null}
      {departMessage ? <Text style={styles.departText}>{departMessage}</Text> : null}
      {show && !nouveau ? (
        <TouchableOpacity onPress={captureImage} style={styles.captureButton}>
          <MaterialIcons name="camera" size={30} color="white" />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundContainer: {
    flex: 1,
    position: "relative",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  auth: {
    backgroundColor: "#18B6EC",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  authText: {
    color: "white",
    fontSize: 18,
  },
  bienvenueText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  departText: {
    fontSize: 20,
    marginTop: 10,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    right: 210,
    //rouge #FF0000
    backgroundColor: "#FF0000",
    //agrandir le bouton

    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  capturedImage: {
    width: 500,
    height: 500,
    marginTop: 20,
    borderRadius: 10,
  },
  startButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#18B6EC",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
