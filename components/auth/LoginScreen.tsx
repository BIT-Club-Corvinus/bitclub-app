import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, ImageBackground, StatusBar } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Icon, Input } from 'react-native-elements'
import { globalStyles } from '../../lib/styles'
import { LinearGradient } from 'expo-linear-gradient'
import Register from './RegisterScreen'
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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'


export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

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

  if (!loaded) {
    return null;
  }

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    else {
      Alert.alert("Sikeres bejelentkezés")
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      Alert.alert(error.message)
    }
    else {
      Alert.alert("Sikeres regisztráció")
    }
    setLoading(false)
  }

  const bit_logo = require("../../assets/BIT-new-logo-FULL-white.png")
  const user_icon = require("../../assets/user_icon.png")

  return (
      <ImageBackground source={require('../../assets/background_pattern.png')} style={{ height: '100%' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} style={{ backgroundColor: 'rgba(0,0,0,0.75)', height: '100%' }}>
          <TouchableWithoutFeedback style={{ paddingHorizontal: 24, }} onPress={Keyboard.dismiss}>
            <View style={styles.imageAndTitleContainer}>
              <Image source={require('../../assets/BIT-new-logo-FULL-white.png')} style={{ height: 200, width: 250 }} />
              <Text style={styles.title}>Bejelentkezés</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.subTitle}>E-mail</Text>
              <View style={styles.textInput}>
                <FontAwesomeIcon icon={faUser} color='#12b0b0' size={20} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder='keresztnev.vezeteknev@bce.bitclub.hu'
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoComplete={undefined}
                  style={{ width: '100%', padding: 20, fontFamily: 'EncodeSans_500Medium' }}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' }}>
                <Text style={styles.subTitle}>Jelszó</Text>
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Elfelejtettem a jelszavam</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.textInput}>
                <FontAwesomeIcon icon={faKey} color='#12b0b0' size={20} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  placeholder='goofyJelszó2024'
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  autoComplete={undefined}
                  style={{ flex: 1, padding: 20, fontFamily: 'EncodeSans_500Medium' }}
                />
                <TouchableOpacity onPress={() => { setPasswordVisible(!isPasswordVisible) }}>
                  <FontAwesomeIcon icon={!isPasswordVisible ? faEye : faEyeSlash} color='#12b0b0' size={20} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={signInWithEmail} style={styles.loginButton}>
                <Text style={styles.buttonText}>Bejelentkezés</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
                <Text style={styles.subTitle}>Még nincs fiókod?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Regisztráció') }}>
                  <Text style={{ color: '#12b0b0', fontFamily: 'EncodeSans_700Bold', fontSize: 16, marginLeft: 2 }}>Regisztráció</Text>
                </TouchableOpacity>
              </View>
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
    paddingTop: 32,
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