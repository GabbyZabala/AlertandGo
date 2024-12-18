import { StyleSheet } from 'react-native';

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
  export default RegisterAccountStyle;