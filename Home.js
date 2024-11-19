import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';


export default function App() {
  const [searchdata, setFilename] = useState('');

  let items = [];  // An empty array to hold the looped components
  for (let i = 0; i < 16; i++) { // Example of looping 5 times
    items.push(
      <View key={i} style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Data {i + 1}</Text>  {/* Displays Data 1, Data 2, etc. */}
      </View>
    );
  };

  let lala = ['ADD ALERT','DELTE ALERT','EDIT ALERT'];
  let headerbuttons = [];
  for(let x = 0; x < lala.length; x++){
    headerbuttons.push(
      <TouchableOpacity key={x} style={styles.header_add} >
        <Text style={styles.header_font}>{lala[x]}</Text>
      </TouchableOpacity>
    )
  };

  const SearchDataList = () => {
    console.log("Data Searching Labeled -[", searchdata);
  };

  return (
    <ImageBackground 
      source={require('./assets/adaptive-icon.png')} 
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>ALERT&GO</Text>
          <Text style={styles.subtitle}>Bind! Grind! and Good to GO!</Text>
          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchdata}
              onChangeText={setFilename}
            />
            <TouchableOpacity style={styles.buttonRight} onPress={SearchDataList}>
              <Text style={styles.buttonTextR}>LOOKUP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subcontainer}>
            <View style={styles.subcontainer_header}>
              {headerbuttons}
            </View>
            {items}
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
    left: 0,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  container: {
    alignItems: 'center',
    width:'100%',
    paddingTop: 10, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: -1,
  },
  subtitle: {
    fontSize: 10,
    color: '#808',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    maxWidth: 560,
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
    maxWidth: 560,
    marginTop: 20,
  },
  buttonRight: {
    flex: 1,
    backgroundColor: '#000',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextR: {
    color: '#fff',
  },
  subcontainer: {
    backgroundColor: 'rgba(134, 134, 135,0.5)',
    paddingVertical:15,
    paddingHorizontal: 30,
    height: 'auto',
    width: '90%',
    maxWidth: 760,
    borderRadius: 25,
    borderWidth:5,
    borderBlockColor: 'white',
    flex:1,
    gap: 5,
  },  
  dataContainer:{
    backgroundColor:'white',
    borderBlockColor:'rgba(134, 134, 135, 0.5)',
    borderWidth:5,
    borderRadius:13,
    padding: '5%',
    height:50,
    width:'100%',
  },
  dataTitle:{
    color:'black'
  },
  subcontainer_header:{
    flex: 1,
    justifyContent: 'flex-start',  
    gap: 5,
    flexDirection:'row',
  },
  header_add:{
    backgroundColor:'white',
    padding: 5,
    borderWidth: 3,
//    borderLeftColor: 'rgba(134, 134, 135, 0.5)',
//    borderRightColor: 'rgba(134, 134, 135, 0.5)',
    borderRadius: 10,
  },
  header_font:{

  },
});
