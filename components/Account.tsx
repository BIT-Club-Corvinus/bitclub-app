import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Text, TextInput, Pressable } from 'react-native'
import { Button, Input, Switch } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import Select, { SelectItem } from '@redmin_delishaj/react-native-select'
import React from 'react'
import { globalStyles } from '../lib/styles'
import { Icon } from 'react-native-elements'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [minutesInOffice, setMinutesInOffice] = useState(0)
  const [isNameVisible, setNameVisibility] = useState(true)

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, namevisibility, minutesinoffice`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setMinutesInOffice(data.minutesinoffice)
        setNameVisibility(data.namevisibility)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    namevisibility,
    minutesinoffice
  }: {
    username: string
    namevisibility: boolean
    minutesinoffice: number
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        namevisibility,
        minutesinoffice,
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
      else {
        Alert.alert("Profil sikeresen frissítve")
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[globalStyles.container, globalStyles.mt20percent]}>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Input
          label="Email cím"
          value={session?.user?.email}
          disabled
          autoCompleteType={undefined}
          labelStyle={globalStyles.labelText}
          inputStyle={globalStyles.inputText}
          leftIcon={{ 'type': 'font-awesome', 'name': 'envelope', 'size': 22 }} />
      </View>
      <View style={globalStyles.verticallySpaced}>
        <Input
          label="Felhasználónév"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
          autoCompleteType={undefined}
          labelStyle={globalStyles.labelText}
          inputStyle={globalStyles.inputText}
          leftIcon={{ 'type': 'font-awesome', 'name': 'user', 'size': 30 }}
          autoCorrect={false}
          autoCapitalize={'none'} />
      </View>
      <View style={globalStyles.row}>
        <Text style={globalStyles.labelText}>Látszódjon a nevem</Text>
        <Switch
          trackColor={{false: 'grey', true: '#12b0b0'}}
          onValueChange={()=>setNameVisibility(previousState => !previousState)}
          value={isNameVisible}
        />
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20, globalStyles.container]}>
        <Pressable
          onPress={() => updateProfile({ username, namevisibility: isNameVisible, minutesinoffice: minutesInOffice})}
          disabled={loading} style={globalStyles.button}>
            <Text style={globalStyles.buttonText}>Update</Text>
        </Pressable>
        <Pressable onPress={() => supabase.auth.signOut()} style={[globalStyles.button, globalStyles.mt20]}>
          <Text style={globalStyles.buttonText}>Sign out</Text>
        </Pressable>
      </View>
    </View>
  )
}
