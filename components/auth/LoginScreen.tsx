import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform, Keyboard, ImageBackground, StatusBar, TouchableWithoutFeedbackBase } from 'react-native'
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
import { faEnvelope, faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
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
    <ImageBackground source={require('../../assets/background_pattern.png')}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 24 }}>
        <TouchableWithoutFeedback style={{ height: '100%', justifyContent: 'center' }} onPress={Keyboard.dismiss}>
          <View style={{ alignItems: 'center' }}>
            <Image source={bit_logo} style={globalStyles.logo2}></Image>
          </View>
          <Text style={globalStyles.title}>
            Bejelentkezés
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
              style={{ width: '100%', fontFamily: 'EncodeSans_500Medium', padding: 20 }} />
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
          <TouchableOpacity>
            <Text style={globalStyles.forgottenPassword}>
              Elfelejtett jelszó
            </Text>
          </TouchableOpacity>
          <View style={globalStyles.container}>
            <TouchableOpacity disabled={loading} onPress={() => signInWithEmail()} style={globalStyles.button}>
              <Text style={[globalStyles.buttonText]}>Bejelentkezés</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={globalStyles.registrationText}>
              Még nincs fiókod?
            </Text>
            <TouchableOpacity disabled={loading} onPress={() => navigation.navigate('Regisztráció')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: '#12b0b0', fontFamily: 'EncodeSans_700Bold', marginLeft: '1.9%' }}>
                Regisztráció
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>

  )
}