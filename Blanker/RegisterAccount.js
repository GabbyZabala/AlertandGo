import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite/next';

function RegisterScreen({ navigation, route }) {
  const [DisplayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [RetryPassword, setRetryPassword] = useState('');
  const [isRetryPasswordHidden, setIsRetryPasswordHidden] = useState(true);
  const { db } = route.params;

  const BacktoLogIn = () => {
    console.log('Going back to Login');
    navigation.goBack();
  };

  const CreateAccount = async () => {
    if (!DisplayName || !username || !password || !RetryPassword) {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return;
    }

    if (password !== RetryPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    console.log('Creating account for', username);
    try {
      const results = await db.execAsync(
        [
          {
            sql: 'INSERT INTO LoginRequireds (Display_Name, User_Name, Password) VALUES (?, ?, ?)',
            args: [DisplayName, username, password],
          },
        ],
        false
      );

      const firstQueryResult = results[0];
      console.log("Rows affected:", firstQueryResult.rowsAffected);

      if (firstQueryResult.rowsAffected > 0) {
        console.log('Account created successfully');
        Alert.alert(
          'Success',
          'Account created successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
          { cancelable: false }
        );
      } else {
        console.log('Failed to create account');
        Alert.alert('Failed', 'Failed to create account.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert(
        'Error',
        'An error occurred while creating the account.'
      );
    }
  };

  return (
    <ImageBackground
      source={require('./assets/adaptive-icon.png')} // Corrected path
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>ALERT&GO</Text>
        <Text style={styles.subtitle}>Bind! Grind! and Good to GO!</Text>
        <Text style={styles.welcomeDialoge}>REGISTER NEW ACCOUNT</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Displayed Name"
          value={DisplayName}
          onChangeText={setDisplayName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.retryPasswordContainer}>
          <TextInput
            style={[styles.input, styles.retryPasswordInput]}
            placeholder="Re-entry Password"
            value={RetryPassword}
            onChangeText={setRetryPassword}
            secureTextEntry={isRetryPasswordHidden}
          />
          <TouchableOpacity
            onPress={() => setIsRetryPasswordHidden(!isRetryPasswordHidden)}
            style={styles.toggleVisibilityButton}
          >
            <Ionicons
              name={isRetryPasswordHidden ? 'eye-off' : 'eye'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLeft} onPress={BacktoLogIn}>
            <Text style={styles.buttonTextL}>Go Back to Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRight} onPress={CreateAccount}>
            <Text style={styles.buttonTextR}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* <StatusBar style="auto" /> */}
      </View>
    </ImageBackground>
  );
}

export default RegisterScreen;
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
    paddingTop: 1, 
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
    marginBottom: 10,
  },
  input: {
    width: '80%',
    maxWidth:560,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  retryPasswordContainer: {
    width: '80%',
    maxWidth: 560,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryPasswordInput: {
    flex: 1,
  },
  toggleVisibilityButton: {
    marginLeft: 10,
    top: -10, 
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