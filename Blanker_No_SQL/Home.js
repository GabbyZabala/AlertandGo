import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeStyles from './Styles/HomeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_ACTIONS = ['ADD TASK', 'DELETE TASK', 'EDIT TASK'];

export default function HomeScreen({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [nextItemId, setNextItemId] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [accountName, setAccountName] = useState('');
  const { userId, displayName } = route.params;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (userId) {
          setAccountName(displayName);
          const tasksValue = await AsyncStorage.getItem(`tasks-${userId}`);
          const tasks = tasksValue ? JSON.parse(tasksValue) : [];
          setItems(tasks);
          if (tasks.length > 0) {
            setNextItemId(Math.max(...tasks.map((item) => item.Task_ID)) + 1);
          } else {
            setNextItemId(1);
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        Alert.alert('Error', 'Failed to load tasks.');
      }
    };

    loadTasks();
  }, [userId, displayName]);

  const handleAction = (action) => {
    switch (action) {
      case 0:
        addItem();
        break;
      case 2:
        toggleEditMode();
        break;
      default:
        break;
    }
  };

  const addItem = async () => {
    const newItem = {
      User_ID: userId,
      Task_ID: nextItemId,
      Title: '',
      Description: '',
      Status: 'Pending',
    };

    try {
      const tasksValue = await AsyncStorage.getItem(`tasks-${userId}`);
      const tasks = tasksValue ? JSON.parse(tasksValue) : [];
      tasks.push(newItem);
      await AsyncStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));

      setItems(tasks);
      setNextItemId(nextItemId + 1);
    } catch (error) {
      console.error('Error adding task:', error);
      Alert.alert('Error', 'Failed to add task.');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const tasksValue = await AsyncStorage.getItem(`tasks-${userId}`);
      const tasks = tasksValue ? JSON.parse(tasksValue) : [];
      const updatedTasks = tasks.filter((item) => item.Task_ID !== itemId);
      await AsyncStorage.setItem(`tasks-${userId}`, JSON.stringify(updatedTasks));

      setItems(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTitleChange = async (itemId, text) => {
    try {
      const tasksValue = await AsyncStorage.getItem(`tasks-${userId}`);
      const tasks = tasksValue ? JSON.parse(tasksValue) : [];
      const updatedTasks = tasks.map((item) =>
        item.Task_ID === itemId ? { ...item, Title: text } : item
      );
      await AsyncStorage.setItem(`tasks-${userId}`, JSON.stringify(updatedTasks));

      setItems(updatedTasks);
    } catch (error) {
      console.error('Error updating task title:', error);
      Alert.alert('Error', 'Failed to update task title.');
    }
  };

  const handleDescriptionChange = async (itemId, text) => {
    try {
      const tasksValue = await AsyncStorage.getItem(`tasks-${userId}`);
      const tasks = tasksValue ? JSON.parse(tasksValue) : [];
      const updatedTasks = tasks.map((item) =>
        item.Task_ID === itemId ? { ...item, Description: text } : item
      );
      await AsyncStorage.setItem(`tasks-${userId}`, JSON.stringify(updatedTasks));

      setItems(updatedTasks);
    } catch (error) {
      console.error('Error updating task description:', error);
      Alert.alert('Error', 'Failed to update task description.');
    }
  };

  const logout = async () => {
    try {
      // Remove the loggedInUserId from AsyncStorage
      await AsyncStorage.removeItem('loggedInUserId');
  
      console.log("Logging out");
      navigation.goBack();
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred during logout.');
    }
  };

  const itemViews = items.map((item) => (
    <View
      key={item.Task_ID}
      style={HomeStyles.dataContainer}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <View style={HomeStyles.Data_Main}>
        <Text style={HomeStyles.dataTitle}>TASK ID: {item.Task_ID}</Text>
        <Text style={HomeStyles.label}>TITLE:</Text>
        <TextInput
          style={[
            HomeStyles.input,
            editMode ? HomeStyles.inputEdit : HomeStyles.inputNotEdit,
          ]}
          placeholder="This Title is empty"
          value={item.Title}
          onChangeText={(text) => handleTitleChange(item.Task_ID, text)}
          editable={editMode}
        />
        <Text style={HomeStyles.label}>Description:</Text>
        <TextInput
          style={[
            HomeStyles.input,
            HomeStyles.descriptionInput,
            editMode ? HomeStyles.inputEdit : HomeStyles.inputNotEdit,
          ]}
          placeholder="Description is empty"
          value={item.Description}
          onChangeText={(text) => handleDescriptionChange(item.Task_ID, text)}
          editable={editMode}
          multiline={true}
        />
      </View>
      <View style={HomeStyles.Data_Side}>
        <View style={HomeStyles.bodie}>
          <TouchableOpacity
            style={HomeStyles.body_Stand}
            onPress={() => deleteItem(item.Task_ID)}
          >
            <Text style={HomeStyles.body_font}>{TASK_ACTIONS[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ));

  if (items.length === 0) {
    itemViews.push(
      <View key="no-data" style={HomeStyles.body_contain}>
        <View style={HomeStyles.bodie}>
          <TouchableOpacity
            style={HomeStyles.body_Stand}
            onPress={() => handleAction(0)}
          >
            <Text style={HomeStyles.body_font}>{TASK_ACTIONS[0]}</Text>
          </TouchableOpacity>
          <Text style={HomeStyles.dataTitle}>NO TASK PRESENT</Text>
        </View>
      </View>
    );
  } else {
    itemViews.push(
      <View key="add-data" style={HomeStyles.body_contain}>
        <View style={HomeStyles.bodie}>
          <TouchableOpacity
            style={HomeStyles.body_Stand}
            onPress={() => handleAction(0)}
          >
            <Text style={HomeStyles.body_font}>{TASK_ACTIONS[0]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/adaptive-icon.png')}
      style={HomeStyles.background}
    >
      <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
        <View style={HomeStyles.container}>
          <Text style={HomeStyles.title}>ALERT&GO</Text>
          <Text style={HomeStyles.subtitle}>Bind! Grind! and Good to GO!</Text>
          <View style={HomeStyles.headbutt}>
            <TouchableOpacity style={HomeStyles.Profile_container}>
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="black"
                style={HomeStyles.accountLogo}
              />
              <Text>{accountName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[HomeStyles.Profile_container, HomeStyles.logoutBox]}
              onPress={logout}
            >
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={HomeStyles.buttonContainer}>
            <Text style={HomeStyles.buttonText}>TASK STATUS</Text>
          </View>
          <View style={HomeStyles.subcontainer}>
            <View style={HomeStyles.header_body}>
              <TouchableOpacity
                style={HomeStyles.body_Stand}
                onPress={() => handleAction(2)}
              >
                <Text style={HomeStyles.body_font}>
                  {TASK_ACTIONS[2]}:{editMode ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
            {itemViews}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}