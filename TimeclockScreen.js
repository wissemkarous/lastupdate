import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function TimeclockScreen() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [isCounting1, setIsCounting1] = useState(false);
  const [isCounting2, setIsCounting2] = useState(false);
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    let intervalId1;
    let intervalId2;

    if (isCounting1) {
      intervalId1 = setInterval(() => {
        setCount1((prevCount1) => prevCount1 + 1);
      }, 1000);
    }

    if (isCounting2) {
      intervalId2 = setInterval(() => {
        setCount2((prevCount2) => prevCount2 + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, [isCounting1, isCounting2]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FeatherIcon name="clock" size={100} />
      <TouchableOpacity onPress={() => setIsCounting1(!isCounting1)} style={styles.cameraButton}>
        <FeatherIcon name={isCounting1 ? 'pause' : 'play'} size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsCounting2(!isCounting2)} style={styles.coffeeButton}>
        <FeatherIcon name={isCounting2 ? 'pause' : 'coffee'} size={30} color="white" />
      </TouchableOpacity>
      {isCounting1 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Work Time: {formatTime(count1)}</Text>
        </View>
      )}
      {isCounting2 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Pause: {formatTime(count2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
