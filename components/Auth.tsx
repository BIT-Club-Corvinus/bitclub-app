import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'} autoCompleteType={undefined} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'} autoCompleteType={undefined} />
      </View>
      <View style={[styles.mt20, styles.button]}>
        <Pressable disabled={loading} onPress={() => signInWithEmail()}>
          <Text style={styles.buttonText}>Bejelentkezés</Text>
        </Pressable>
      </View>
      <View style={styles.mt20}>
        <Text style={styles.registrationText}>Még nincs fiókod? Regisztrálj itt!</Text>
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
    color: '#12b0b0'
  },
  buttonText:{
    color: 'white',
    fontSize: 20
  }
})