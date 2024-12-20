import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite';

const DIALOGS = [
  'Welcome to ALERT&GO!',
  'Get ready to achieve your goals!',
  'Success is just one step away!',
  'Your journey starts here!',
  'Make every moment count!',
  'BIND! GRIND! and Good to GO!',
  'Ayaw kona mag Code',
  '43450 + 36,635 = ?',
];

function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { db } = route.params;

  const handleLogin = async () => {
    console.log('Logging in with', username, password);
    if (!db) {
      console.error("Database not initialized.");
      return;
    }
    try {
      const results = await db.execAsync(
        [
          {
            sql: 'SELECT User_ID, Display_Name FROM LoginRequireds WHERE User_Name = ? AND Password = ?',
            args: [username, password],
          },
        ],
        true
      );

      // Access the result of the first query
      const firstQueryResult = results[0];

      if (firstQueryResult.rows.length > 0) {
        const user = firstQueryResult.rows[0];
        console.log('Login successful. User ID:', user.User_ID);
        navigation.navigate('Home', {
          userId: user.User_ID,
          displayName: user.Display_Name,
        });
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  const handleCreateAccount = () => {
    console.log('Going to Create Account');
    navigation.navigate('Register');
  };

  const showRandomDialog = () => {
    const randomIndex = Math.floor(Math.random() * DIALOGS.length);
    return DIALOGS[randomIndex];
  };

  return (
    <ImageBackground
      source={require('./assets/adaptive-icon.png')} // Corrected path
      style={LStyles.background}
    >
      <View style={LStyles.container}>
        <Text style={LStyles.title}>ALERT&GO</Text>
        <Text style={LStyles.subtitle}>Bind! Grind! and Good to GO!</Text>
        <Text style={LStyles.welcomeDialoge}>{showRandomDialog()}</Text>
        <TextInput
          style={LStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={LStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={LStyles.buttonContainer}>
          <TouchableOpacity
            style={LStyles.buttonLeft}
            onPress={handleCreateAccount}
          >
            <Text style={LStyles.buttonTextL}>Create New Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={LStyles.buttonRight} onPress={handleLogin}>
            <Text style={LStyles.buttonTextR}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* <StatusBar style="auto" /> */}
      </View>
    </ImageBackground>
  );
}

export default LoginScreen;
const LStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -1,
  },
  subtitle:{
    fontSize:10,
    color:'#808',
    marginBottom:40,
  },
  welcomeDialoge:{
    fontSize:20,
    color:'#fffff',
    marginBottom: 10
  },
  input: {
    width: '80%',
    maxWidth:560,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Added for better readability over the background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth:560,
    marginTop: 20,
  },
  buttonLeft: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    marginRight: 10, 
  },
  buttonRight: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  buttonTextR: {
    color: '#fff',
  },
  buttonTextL:{
    color:'#000',
  },
});