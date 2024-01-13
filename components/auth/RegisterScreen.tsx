import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, ImageBackground, Keyboard } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Icon, Input } from 'react-native-elements'
import { globalStyles } from '../../lib/styles'
import { LinearGradient } from 'expo-linear-gradient'
import {
  useFonts,
  EncodeSans_100Thin,
  EncodeSans_200ExtraLight,
  EncodeSans_300Light,
  EncodeSans_400Regular,
  EncodeSans_500Medium,
  EncodeSans_600SemiBold,
  EncodeSans_700Bold,
  EncodeSans_800ExtraBold,
  EncodeSans_900Black,
} from '@expo-google-fonts/encode-sans';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


export default function Auth({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [loaded] = useFonts({
    EncodeSans_100Thin,
    EncodeSans_200ExtraLight,
    EncodeSans_300Light,
    EncodeSans_400Regular,
    EncodeSans_500Medium,
    EncodeSans_600SemiBold,
    EncodeSans_700Bold,
    EncodeSans_800ExtraBold,
    EncodeSans_900Black,
  });
  const [screenState, setScreenState] = useState('register');

  if (!loaded) {
    return null;
  }

  async function signUpWithEmail() {
    if (email != '' && password != '' && confirmPassword != '') {
      if (password != confirmPassword) {
        Alert.alert('A jelszavak nem egyeznek');
        return;
      }
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if (error) {
        Alert.alert(error.message)
      }
      else {
        navigation.navigate('Megerősítés', {email: email})
        Alert.alert("Sikeres regisztráció")
      }
      setLoading(false)
    }
    return;
  }

  const bit_logo = require("../../assets/BIT-new-logo-FULL-white.png")
  const user_icon = require("../../assets/user_icon.png")

  return (
    <ImageBackground source={require('../../assets/background_pattern.png')} style={{height: '100%'}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} style={{backgroundColor: 'rgba(0,0,0,0.75)', height: '100%'}}>
        <TouchableWithoutFeedback style={{paddingHorizontal: 24}} onPress={Keyboard.dismiss}>
          <View style={styles.imageAndTitleContainer}>
            <Text style={styles.title}>Regisztráció</Text>
          </View>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>

  )
}


const styles = StyleSheet.create({
  imageAndTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100
  },
  title: {
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 26,
    color: 'white',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  subTitle: {
    fontFamily: 'EncodeSans_600SemiBold',
    fontSize: 16,
    color: 'white'
  },
  textInput: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 9,
    backgroundColor: 'white',
    height: 'auto',
    marginBottom: 8,
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 16,
    shadowColor: 'white',
    shadowOpacity: 0.75,
    shadowOffset: {
      width: 2,
      height: 2
    }
  },
  loginButton: {
    backgroundColor: '#12b0b0',
    borderRadius: 9,
    paddingVertical: 16,
    height: 'auto',
    marginTop: 28,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'EncodeSans_600SemiBold',
    fontSize: 18
  },
  forgotPassword: {
    fontFamily: 'EncodeSans_400Regular',
    fontSize: 12,
    textDecorationLine: 'underline'
  }
})