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
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'


export default function Auth({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
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
        navigation.navigate('Megerősítés', { email: email })
        Alert.alert("Sikeres regisztráció")
      }
      setLoading(false)
    }
    return;
  }

  const bit_logo = require("../../assets/BIT-new-logo-FULL-white.png")
  const user_icon = require("../../assets/user_icon.png")

  return (
    <ImageBackground source={require('../../assets/background_pattern.png')}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 24 }}>
        <TouchableWithoutFeedback style={{ height: '100%', justifyContent: 'center' }} onPress={Keyboard.dismiss}>
          <Text style={globalStyles.title}>
            Regisztráció
          </Text>
          <Text style={globalStyles.labelText}>
            E-mail cím
          </Text>
          <View style={[globalStyles.inputContainer]}>
            <FontAwesomeIcon icon={faEnvelope} size={20} color='#12b0b0' />
            <TextInput
              onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
              value={email}
              placeholder="keresztnev.vezeteknev@bce.bitclub.com"
              autoCapitalize={'none'} autoComplete={undefined}
              autoCorrect={false}
              style={{ flex: 1, fontFamily: 'EncodeSans_500Medium', padding: 20 }}
            />
          </View>
          <Text style={globalStyles.labelText}>
            Jelszó
          </Text>
          <View style={[globalStyles.inputContainer]}>
            <FontAwesomeIcon icon={faKey} size={20} color='#12b0b0' />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!isPasswordVisible}
              placeholder="#Bitizenvagyok420"
              autoCapitalize={'none'} autoComplete={undefined}
              autoCorrect={false}
              style={{ flex: 1, fontFamily: 'EncodeSans_500Medium', padding: 20 }}
            />
            <TouchableOpacity onPress={()=>setPasswordVisible(!isPasswordVisible)}>
              <FontAwesomeIcon icon={!isPasswordVisible ? faEye : faEyeSlash} size={20} color='#12b0b0' />
            </TouchableOpacity>
          </View>
          <Text style={globalStyles.labelText}>
            Jelszó megerősítése
          </Text>
          <View style={[globalStyles.inputContainer]}>
            <FontAwesomeIcon icon={faKey} size={20} color='#12b0b0' />
            <TextInput
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry={true}
              placeholder="#Bitizenvagyok420"
              autoCapitalize={'none'} autoComplete={undefined}
              autoCorrect={false}
              style={{ flex: 1, fontFamily: 'EncodeSans_500Medium', padding: 20 }} />
          </View>
          <View style={globalStyles.container}>
            <TouchableOpacity onPress={() => { signUpWithEmail() }} style={globalStyles.button}>
              <Text style={[globalStyles.buttonText]}>Regisztráció</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={globalStyles.registrationText}>
              Már van fiókod?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bejelentkezés')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: '#12b0b0', fontFamily: 'EncodeSans_700Bold', marginLeft: '1.9%' }}>
                Belépés
              </Text>
            </TouchableOpacity>
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