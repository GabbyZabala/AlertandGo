import { Text, View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retryPassword, setRetryPassword] = useState('');
  const [isRetryPasswordHidden, setIsRetryPasswordHidden] = useState(true);

  const BacktoLogIn = () => {
    console.log('Going back to Login');
    navigation.goBack();
  };

  const CreateAccount = async () => {
    if (!displayName || !username || !password || !retryPassword) {
      Alert.alert('Incomplete Form', 'Please fill in all fields.');
      return;
    }

    if (password !== retryPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      const usersValue = await AsyncStorage.getItem('users');
      const users = usersValue ? JSON.parse(usersValue) : [];

      // Simple auto-increment for ID
      let nextId = 1;
      if (users.length > 0) {
        nextId = Math.max(...users.map(u => u.id)) + 1;
      }

      const newUser = {
        id: nextId,
        displayName: displayName,
        username: username,
        password: password,
      };

      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));

      console.log('Account created successfully');
      Alert.alert(
        'Success',
        'Account created successfully!',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error creating account:', error);
      Alert.alert('Error', 'An error occurred while creating the account.');
    }
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('./assets/adaptive-icon.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>ALERT&GO</Text>
        <Text style={styles.subtitle}>Bind! Grind! and Good to GO!</Text>
        <Text style={styles.welcomeDialoge}>REGISTER NEW ACCOUNT</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Displayed Name"
          value={displayName}
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
            value={retryPassword}
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
  subtitle: {
    fontSize: 10,
    color: '#808',
    marginBottom: 40,
  },
  welcomeDialoge: {
    fontSize: 20,
    color: '#fffff',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    maxWidth: 560,
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
    maxWidth: 560,
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
  buttonTextL: {
    color: '#000',
  },
});