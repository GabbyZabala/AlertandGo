import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'relative',
    left: 0,
  },
  headbutt: {
    flex: 0,
    width: '100%',
    maxWidth: 760,
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    flexDirection: 'row',
  },
  Profile_container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  logoutBox: {
    flex: 0.25,
    justifyContent: 'center',
    backgroundColor: 'rgba(115, 115, 115, 0.89)',
    height: 35,
    width: 90,
    padding: 10,
    color: 'rgb(255, 255, 255)',
    borderStartWidth: 5,
  },
  accountLogo: {
    top: -10,
    marginRight: 10, // Space between the icon and text
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  container: {
    alignItems: 'center',
    width: '100%',
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
    width: '100%', // Adjusted width
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  inputEdit: {
    borderColor: '#000',
    borderWidth: 1,
  },
  inputNotEdit: {
    borderWidth: 0,
  },
  descriptionInput: {
    height: 80, // Increased height for description
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 560,
    marginTop: 20,
  },
  buttonText: {
    color: 'rgba(134, 134, 135,0.5)',
  },
  subcontainer: {
    backgroundColor: 'rgba(134, 134, 135,0.5)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    height: 'auto',
    width: '100%',
    maxWidth: 760,
    borderRadius: 25,
    borderWidth: 2,
    borderBlockColor: 'white',
    flex: 1,
    gap: 5,
  },
  dataContainer: {
    backgroundColor: 'white',
    borderBlockColor: 'rgba(134, 134, 135, 0.5)',
    borderWidth: 5,
    borderRadius: 13,
    padding: '5%',
    height: 'auto',
    width: '100%',
    marginBottom: 10,
  },
  Data_Main: {
    width: '85%'
  },
  Data_Side: {
    width: '15%',
    justifyContent: 'center', // Center vertically
  },
  dataTitle: {
    color: 'black',
    marginBottom: 5, // Added margin bottom
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5, // Added margin top
    marginBottom: 2, // Added margin bottom
  },
  subcontainer_header: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 5,
    flexDirection: 'row',
  },
  header_add: {
    backgroundColor: 'white',
    padding: 5,
    borderWidth: 3,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  header_body: {
    width: 100,
  },
  body_Stand: {
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    borderLeftColor: 'rgba(134, 134, 135, 0.5)',
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignContent: 'center',
    width: 120,
  },
  body_font: {
    left: '10%'
  },
  body_contain: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  bodie: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default HomeStyles;