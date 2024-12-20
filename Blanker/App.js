import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Import your screen components
import LoginScreen from './Login';
import RegisterScreen from './RegisterAccount';
import HomeScreen from './Home';

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Open the database using openDatabaseSync
const db = SQLite.openDatabaseSync('AlertNgoDB.db');

function App() {
  React.useEffect(() => {
    try {
      db.exec(
        [
          {
            sql: `CREATE TABLE IF NOT EXISTS LoginRequireds (
                    User_ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Display_Name TEXT, 
                    User_Name TEXT, 
                    Password TEXT
                  )`,
            args: [],
          },
          {
            sql: `CREATE TABLE IF NOT EXISTS Alert_NgoLouge (
                    User_ID INTEGER, 
                    Task_ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Title TEXT, 
                    Description TEXT, 
                    Status TEXT,
                    FOREIGN KEY (User_ID) REFERENCES LoginRequireds(User_ID)
                  )`,
            args: [],
          },
        ],
        false // Set to true for read-only transactions, false for read-write transactions
      );
      console.log("Tables created successfully.");
    } catch (error) {
      console.error("Error creating tables:", error);
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
          initialParams={{ db }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
          initialParams={{ db }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
          initialParams={{ db }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;