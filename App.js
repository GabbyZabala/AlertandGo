import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Logging in with", username, password);
  };

  const handleCreateAccount = () => {
    console.log("Creating account for", username);
  };

  return (
    <ImageBackground 
      source={require('./assets/adaptive-icon.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>ALERT&GO</Text>
        <Text style={styles.subtitle}>Bind! Grind! and Good to GO!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLeft} onPress={handleCreateAccount}>
            <Text style={styles.buttonTextL}>Create New Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRight} onPress={handleLogin}>
            <Text style={styles.buttonTextR}>Log In</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -1,
  },
  subtitle:{
    fontSize:10,
    color:'#808',
    marginBottom:50,
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