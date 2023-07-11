import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function TimeclockScreen() {
  const startVideo = () => {
    // Code to start the video here
  };

  const makeCoffee = () => {
    // Code to make coffee here
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FeatherIcon name="clock" size={100} />
      <Text>Work Time!</Text>
      <TouchableOpacity onPress={startVideo} style={styles.cameraButton}>
        <FeatherIcon name="play" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={makeCoffee} style={styles.coffeeButton}>
        <FeatherIcon name="coffee" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#00bfff',
    borderRadius: 50,
    padding: 10,
  },
  coffeeButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 50,
    padding: 10,
  },
});

export default TimeclockScreen;
