import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    alignItems: 'center'
  },
  verticallySpaced: {
    paddingTop: '4%',
    paddingBottom: '4%',
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#12b0b0",
    width: '85%',
    padding: '3%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registrationText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#12b0b0',
    textDecorationStyle: 'solid',
    color: '#12b0b0',
    fontFamily: 'EncodeSans'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EncodeSans-Bold'
  },
  logo: {
    height: '30%',
    width: '75%',
    marginTop: '10%'
  },
  labelText: {
    fontFamily: 'EncodeSans-Bold'
  },
  inputText: {
    fontFamily: 'EncodeSans-Light',
    fontSize: 16,
    marginLeft: '2.5%'
  },
  mt20percent:{
    marginTop: '20%'
  }
})