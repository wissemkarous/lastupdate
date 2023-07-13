import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function DashboardScreen() {
  const [isDoubleSession, setIsDoubleSession] = useState(false);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getCurrentTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => setQuote(getRandomQuote()), 30000);
    return () => clearInterval(quoteTimer);
  }, []);

  const getRandomQuote = () => {
    const quotes = [
      'Life is a mystery to be lived, not a problem to be solved. - Gandhi',
      'Life is like riding a bicycle, to keep your balance, you must keep moving. - Albert Einstein',
      'Life is made up of small pleasures. - Unknown',
      'Life is a challenge to be embraced, a happiness to be earned, an adventure to be lived. - Mother Teresa',
      'Life is a flower of which love is the honey. - Victor Hugo',
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleDoubleSession = () => {
    setIsDoubleSession(true);
  };

  const handleSingleSession = () => {
    setIsDoubleSession(false);
  };

  const renderTimeSlot = () => {
    if (isDoubleSession) {
      return (
        <>
          <Text style={styles.timeSlotText}>8:00 AM - 12:00 PM</Text>
          <Text style={styles.timeSlotText}>12:00 PM - 2:00 PM (Break)</Text>
          <Text style={styles.timeSlotText}>2:00 PM - 5:30 PM</Text>
        </>
      );
    } else {
      return <Text style={styles.timeSlotText}>8:00 AM - 2:30 PM</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.section, styles.header]}>
        <View style={styles.currentTimeContainer}>
          <AntDesign name="clockcircleo" size={25} color="#000" />
          <Text style={styles.currentTimeText}>Current Time: {currentTime}</Text>
        </View>
      </View>

      <View style={[styles.section, styles.buttonContainer]}>
        <TouchableOpacity
          style={[styles.button, !isDoubleSession ? styles.selectedButton : null]}
          onPress={handleSingleSession}
        >
          <Text style={[styles.buttonText, !isDoubleSession ? styles.selectedButtonText : null]}>
            Single Session
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isDoubleSession ? styles.selectedButton : null]}
          onPress={handleDoubleSession}
        >
          <Text style={[styles.buttonText, isDoubleSession ? styles.selectedButtonText : null]}>
            Double Session
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.quoteContainer]}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>

      <View style={[styles.section, styles.timeSlotContainer]}>
        <Text style={styles.timeSlotTitle}>Time Slot:</Text>
        {renderTimeSlot()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  section: {
    borderRadius: 8,
    marginBottom: 20,
    padding: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#f5f5f5',
  },
  currentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currentTimeText: {
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#c0c0c0',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: '#f0a500',
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  quoteContainer: {},
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    //white  color code: #ffffff
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
  },
  timeSlotContainer: {},
  timeSlotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
  },
  timeSlotText: {
    fontSize: 16,
    marginBottom: 5,
    //changer style d'ecriture italique
    fontStyle: 'italic',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
  },
});

export default DashboardScreen;