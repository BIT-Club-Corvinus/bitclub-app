import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
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


export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
  const [screenState, setScreenState] = useState('login');

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
    <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={globalStyles.linearGradient} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ height: '100%', justifyContent: 'center' }}>
          <View style={{alignItems: 'center'}}>
            <Image source={bit_logo} style={globalStyles.logo2}></Image>
          </View>
          <Text style={globalStyles.title}>
            Bejelentkezés
          </Text>
          <Text style={globalStyles.labelText}>
            E-mail cím
          </Text>
          <View style={[globalStyles.inputContainer]}>
            <Icon type='font-awesome' name='user' style={globalStyles.inputIcon} color={'#12b0b0'}></Icon>
            <TextInput
              onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
              value={email}
              placeholder="keresztnev.vezeteknev@bce.bitclub.com"
              autoCapitalize={'none'} autoComplete={undefined}
              autoCorrect={false}
              style={{ width: '100%' }} />
          </View>
          <Text style={globalStyles.labelText}>
            Jelszó
          </Text>
          <View style={[globalStyles.inputContainer]}>
            <Icon name={'lock'} type={'font-awesome'} style={globalStyles.inputIcon} color={'#12b0b0'}></Icon>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="#Bitizenvagyok420"
              autoCapitalize={'none'} autoComplete={undefined}
              autoCorrect={false}
              style={{ width: '100%' }} />
          </View>
          <View>
            <Text style={globalStyles.forgottenPassword}>
              Elfelejtett jelszó
            </Text>
          </View>
          <View style={globalStyles.container}>
            <View style={[globalStyles.mt20, globalStyles.button]}>
              <Pressable disabled={loading} onPress={() => signInWithEmail()}>
                <Text style={[globalStyles.buttonText]}>Bejelentkezés</Text>
              </Pressable>
            </View>
          </View>
          <View style={globalStyles.mt20}>
            <Pressable disabled={loading} onPress={() => navigation.navigate('Regisztráció')} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={globalStyles.registrationText}>
                Még nincs fiókod?
              </Text>
              <Text style={{ color: '#12b0b0', fontFamily: 'EncodeSans_700Bold', marginLeft: '1.9%' }}>
                Regisztráció
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

