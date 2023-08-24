import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 0,
    padding: 0,
    justifyContent: 'center',
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
      height: 5,
    },
    elevation: 20
  },
  logoutButton: {
    backgroundColor: "#f69133",
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
    },
    elevation: 20
  },
  registrationText: {
    textAlign: 'center',
    textDecorationColor: 'white',
    textDecorationStyle: 'solid',
    color: 'white',
    fontFamily: 'EncodeSans_700Bold'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'EncodeSans_700Bold',
  },
  logo: {
    height: '55%',
    width: '45%',
    marginTop: '5%'
  },
  logo2: {
    height: 200,
    width: 200,
    marginHorizontal: '20%',
    marginTop: '0%'
  },
  labelText: {
    fontFamily: 'EncodeSans_500Medium',
    color: 'white', fontSize: 20,
    marginBottom: '2.5%'
  },
  inputText: {
    fontFamily: 'EncodeSans_700Bold',
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
    paddingTop: '0%',
    paddingHorizontal: '5%',
  },
  title: {
    color: 'white',
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 30,
    paddingBottom: '10%',
    textAlign: 'center'
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 100,
    backgroundColor: 'white',
    height: 60,
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
    fontFamily: 'EncodeSans_700Bold',
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
    height: 650,
    left: 0,
    top: 0
  },
  gradient2: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingHorizontal: '5%',
  },
  buttonText2: {
    color: '#12b0b0',
    fontSize: 20,
    fontFamily: 'EncodeSans_700Bold'
  },
  bitNewsList: {
    flex: 1,
    marginTop: '30%',
    flexDirection: 'column',
    width: '100%',
  },
  bitNewsContainer: {
    width: '100%',
    paddingVertical: '5%',
    borderRadius: 20,
    flex: 1 / 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
    backgroundColor: 'black'
  },
  bitNewsTitle: {
    fontFamily: 'EncodeSans_600SemiBold',
    fontSize: 26,
    color: 'white'
  },
  bitNewsSubTitle: {
    fontFamily: 'EncodeSans_700Bold',
    textTransform: 'uppercase',
    color: '#12b0b0',
    marginVertical: '5%',
    fontSize: 22,
    paddingHorizontal: '5%'
  },
  bitNewsContent: {
    fontFamily: 'EncodeSans_400Regular',
    textAlign: 'justify',
    paddingHorizontal: '5%'
  },
  bitizenName: {
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginVertical: '5%'
  },
  bitizenImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: '10%'
  },
  bitNewsContentContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: '#D9D9D9',
    paddingVertical: '5%',
    marginHorizontal: '5%',
    marginTop: '2.5%',
    borderRadius: 20,
    marginBottom: '2.5%'
  },
  backgroundPattern: {
    flex: 1,
    resizeMode: 'cover',
  },
  welcomeLogo: {
    height: 228,
    width: 342,
    marginTop: '5%',
    marginBottom: 72
  },
  welcomeText: {
    fontFamily: 'EncodeSans_600SemiBold',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 40,
    textAlign: 'center',
    marginBottom: 48
  },
  welcomeButton1: {
    width: '100%',
    backgroundColor: '#1ee7e7',
    padding: 16,
    justifyContent: 'center',
    borderRadius: 15.33,
    alignItems: 'center',
    marginTop: 32
  },
  welcomeButton2: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 16,
    justifyContent: 'center',
    borderRadius: 15.33,
    alignItems: 'center',
    marginTop: 16
  },
  blurContainer: {
    width: '100%',
    height: 148,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bigBlurContainerWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#1ee7e7',
    borderWidth: 2,
    marginBottom: 32,
    width: '100%',
  },
  smallBlurContainerWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    width: '80%',
    marginHorizontal: 32
  }
})