import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/Feather';

import HomeScreen from './screens/HomeScreen';//usless for now but will be used later on 
import TimeclockScreen from './screens/TimeclockScreen';
import TimesheetsScreen from './screens/TimesheetsScreen';
import DashboardScreen from './screens/DashboardScreen';

const Tab = createBottomTabNavigator();

function MyTabs({ isAdmin }) {
  return (
    <Tab.Navigator>
      {isAdmin && (
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="home" color={color} size={size} />
            ),
          }}
        />
      )}
      {isAdmin && (
        <Tab.Screen
          name="User"
          component={TimeclockScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="user" color={color} size={size} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Time clock"
        component={TimeclockScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name="clock" color={color} size={size} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Timesheets"
          component={TimesheetsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name="clipboard" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6fa',
  },
  logoContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
    borderRadius: 60,
    borderWidth: 2,
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
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
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 0,
    padding: 20,
  },
  logoutIcon: {
    fontSize: 35,
    color: 'black',
  },
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(password === 'admin123');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://www.bootdey.com/img/Content/avatar/avatar7.png' }}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Username" />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MyTabs isAdmin={isAdmin} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FeatherIcon name="log-out" style={styles.logoutIcon} />
      </TouchableOpacity>
    </NavigationContainer>
  );
}
