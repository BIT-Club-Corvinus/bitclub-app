import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useFonts } from 'expo-font'
import {globalStyles} from '../lib/styles'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded] = useFonts({
    'EncodeSans': require('../assets/fonts/EncodeSans/EncodeSans-Medium.ttf'),
    'EncodeSans-Bold': require('../assets/fonts/EncodeSans/EncodeSans-Bold.ttf'),
    'EncodeSans-Light': require('../assets/fonts/EncodeSans/EncodeSans-Light.ttf')
  })

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
    else{
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
    else{
      Alert.alert("Sikeres regisztráció")
    }
    setLoading(false)
  }

  const bit_logo = require("../assets/bit_logo.png")

  return (
    <View style={[globalStyles.container]}>
      <Image source={bit_logo} style={globalStyles.logo}></Image>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email cím"
          leftIcon={{ type: 'font-awesome', name: 'envelope', size: 22 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="keresztnev.vezeteknev@bce.bitclub.com"
          autoCapitalize={'none'} autoCompleteType={undefined}
          labelStyle={globalStyles.labelText}
          inputStyle={globalStyles.inputText}
          disabled={loading}
          autoCorrect={false}/>
      </View>
      <View style={globalStyles.verticallySpaced}>
        <Input
          label="Jelszó"
          leftIcon={{ type: 'font-awesome', name: 'lock', size: 32 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="#Bitizenvagyok420"
          autoCapitalize={'none'} autoCompleteType={undefined}
          labelStyle={globalStyles.labelText}
          inputStyle={globalStyles.inputText}
          disabled={loading}
          autoCorrect={false}/>
      </View>
      <View style={[globalStyles.mt20, globalStyles.button]}>
        <Pressable disabled={loading} onPress={() => signInWithEmail()}>
          <Text style={[globalStyles.buttonText]}>Bejelentkezés</Text>
        </Pressable>
      </View>
      <View style={globalStyles.mt20}>
        <Pressable disabled={loading} onPress={() => signUpWithEmail()}>
          <Text style={globalStyles.registrationText}>Még nincs fiókod? Regisztrálj itt!</Text>
        </Pressable>
      </View>
    </View>
  )
}

