import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    marginTop: 0,
    padding: 0,
    alignItems: 'center',
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
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 4,
      height: 5
    }
  },
  registrationText: {
    textAlign: 'center',
    textDecorationColor: 'white',
    textDecorationStyle: 'solid',
    color: 'white',
    fontFamily: 'EncodeSans-Bold'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EncodeSans-Bold'
  },
  logo: {
    height: '55%',
    width: '75%',
    marginTop: '20%'
  },
  labelText: {
    fontFamily: 'EncodeSans',
    color: 'white', fontSize: 20,
    marginBottom: '2.5%'
  },
  inputText: {
    fontFamily: 'EncodeSans-Light',
    fontSize: 16,
    marginLeft: '2.5%'
  },
  mt20percent: {
    marginTop: '20%'
  },
  row: {
    flexDirection: "row",
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%'
  },
  linearGradient: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    paddingTop: '20%',
    paddingHorizontal: '5%',
    paddingBottom: '50%'
  },
  title: {
    color: 'white',
    fontFamily: 'EncodeSans-Bold',
    fontSize: 36
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: 'white',
    height: '8.5%',
    marginBottom: '5%',
    width: '100%',
    padding: '2%',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 4,
      height: 5
    }
  },
  inputIcon: {
    height: 40,
    width: 40,
    marginTop: '30%'
  },
  forgottenPassword: {
    color: 'white',
    fontFamily: 'EncodeSans-Light',
    textAlign: 'right',
    fontSize: 12
  },
  whiteButton: {
    backgroundColor: "white",
    width: '85%',
    padding: '3%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 4,
      height: 5
    }
  },
  webImage: {
    position: 'absolute',
    width: 400,
    height: 580,
    left: 0,
    top: -90
  },
  gradient2: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  buttonText2:{
    color: '#12b0b0',
    fontSize: 20,
    fontFamily: 'EncodeSans-Bold'
  }
})