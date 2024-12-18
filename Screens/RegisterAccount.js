import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RStyles from '../Styles/RegisterAccountStyle'; // Make sure the path is correct

function RegisterScreen({ navigation }) {
  const [DisplayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [RetryPassword, setRetryPassword] = useState('');
  const [isRetryPasswordHidden, setIsRetryPasswordHidden] = useState(true);

  const BacktoLogIn = () => {
    console.log('Going back to Login');
    navigation.goBack();
  };

  const CreateAccount = () => {
    console.log('Creating account for', username);
    // TODO: Add your actual account creation logic here (e.g., database, API call)
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/adaptive-icon.png')} // Corrected path
      style={RStyles.background}
    >
      <View style={RStyles.container}>
        <Text style={RStyles.title}>ALERT&GO</Text>
        <Text style={RStyles.subtitle}>Bind! Grind! and Good to GO!</Text>
        <Text style={RStyles.welcomeDialoge}>REGISTER NEW ACCOUNT</Text>
        <TextInput
          style={RStyles.input}
          placeholder="Enter Displayed Name"
          value={DisplayName}
          onChangeText={setDisplayName}
        />
        <TextInput
          style={RStyles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={RStyles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <View style={RStyles.retryPasswordContainer}>
          <TextInput
            style={[RStyles.input, RStyles.retryPasswordInput]}
            placeholder="Re-entry Password"
            value={RetryPassword}
            onChangeText={setRetryPassword}
            secureTextEntry={isRetryPasswordHidden}
          />
          <TouchableOpacity
            onPress={() => setIsRetryPasswordHidden(!isRetryPasswordHidden)}
            style={RStyles.toggleVisibilityButton}
          >
            <Ionicons
              name={isRetryPasswordHidden ? 'eye-off' : 'eye'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={RStyles.buttonContainer}>
          <TouchableOpacity style={RStyles.buttonLeft} onPress={BacktoLogIn}>
            <Text style={RStyles.buttonTextL}>Go Back to Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={RStyles.buttonRight} onPress={CreateAccount}>
            <Text style={RStyles.buttonTextR}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/* <StatusBar style="auto" /> */}
      </View>
    </ImageBackground>
  );
}

export default RegisterScreen;