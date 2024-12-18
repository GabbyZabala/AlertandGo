import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HomeStyles from '../Styles/HomeStyles'; // Make sure the path is correct

const TASK_ACTIONS = ['ADD TASK', 'DELETE TASK', 'EDIT TASK'];

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [nextItemId, setNextItemId] = useState(1);
  const [editMode, setEditMode] = useState(false);

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

  const addItem = () => {
    setItems([
      ...items,
      {
        id: nextItemId,
        title: '',
        description: '',
      },
    ]);
    setNextItemId(nextItemId + 1);
  };

  const deleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTitleChange = (itemId, text) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, title: text } : item
      )
    );
  };

  const handleDescriptionChange = (itemId, text) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, description: text } : item
      )
    );
  };

  const logout = () => {
    navigation.navigate('Login');
  };

  const itemViews = items.map((item) => (
    <View
      key={item.id}
      style={HomeStyles.dataContainer}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <View style={HomeStyles.Data_Main}>
        <Text style={HomeStyles.dataTitle}>TASK ID: {item.id}</Text>
        <Text style={HomeStyles.label}>TITLE:</Text>
        <TextInput
          style={[
            HomeStyles.input,
            editMode ? HomeStyles.inputEdit : HomeStyles.inputNotEdit,
          ]}
          placeholder="This Title is empty"
          value={item.title}
          onChangeText={(text) => handleTitleChange(item.id, text)}
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
          value={item.description}
          onChangeText={(text) => handleDescriptionChange(item.id, text)}
          editable={editMode}
          multiline={true}
        />
      </View>
      <View style={HomeStyles.Data_Side}>
        <View style={HomeStyles.bodie}>
          <TouchableOpacity
            style={HomeStyles.body_Stand}
            onPress={() => deleteItem(item.id)}
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
      source={require('../assets/adaptive-icon.png')} // Corrected path
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
              <Text>[ACCOUNT NAME]</Text>
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
          {/* <StatusBar style="auto" /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}