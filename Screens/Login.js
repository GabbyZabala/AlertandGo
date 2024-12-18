import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet, // Import StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import LStyles from '../Styles/LoginStyles'; // Make sure the path is correct

const DIALOGS = [
  'Welcome to ALERT&GO!',
  'Get ready to achieve your goals!',
  'Success is just one step away!',
  'Your journey starts here!',
  'Make every moment count!',
  'BIND! GRIND! and Good to GO!',
  'Ayaw kona mag Code',
];

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', username, password);
    // TODO: Handle your actual login logic here (e.g., API call)
    navigation.navigate('Home');
  };

  const handleCreateAccount = () => {
    console.log('Going to Create Account');
    navigation.navigate('Register'); // Corrected the typo
  };

  const showRandomDialog = () => {
    const randomIndex = Math.floor(Math.random() * DIALOGS.length);
    return DIALOGS[randomIndex];
  };

  return (
    <ImageBackground
      source={require('../assets/adaptive-icon.png')} // Corrected path
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