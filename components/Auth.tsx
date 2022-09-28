import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useFonts } from 'expo-font'

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
    <View style={[styles.container]}>
      <Image source={bit_logo} style={styles.logo}></Image>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email cím"
          leftIcon={{ type: 'font-awesome', name: 'envelope', size: 22 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="keresztnev.vezeteknev@bce.bitclub.com"
          autoCapitalize={'none'} autoCompleteType={undefined}
          labelStyle={styles.labelText}
          inputStyle={styles.inputText}
          disabled={loading}
          autoCorrect={false}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Jelszó"
          leftIcon={{ type: 'font-awesome', name: 'lock', size: 32 }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="#Bitizenvagyok420"
          autoCapitalize={'none'} autoCompleteType={undefined}
          labelStyle={styles.labelText}
          inputStyle={styles.inputText}
          disabled={loading}
          autoCorrect={false}/>
      </View>
      <View style={[styles.mt20, styles.button]}>
        <Pressable disabled={loading} onPress={() => signInWithEmail()}>
          <Text style={[styles.buttonText]}>Bejelentkezés</Text>
        </Pressable>
      </View>
      <View style={styles.mt20}>
        <Pressable disabled={loading} onPress={() => signUpWithEmail()}>
          <Text style={styles.registrationText}>Még nincs fiókod? Regisztrálj itt!</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})