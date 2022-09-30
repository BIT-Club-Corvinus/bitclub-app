import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Text, TextInput } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import Select, { SelectItem } from '@redmin_delishaj/react-native-select'
import React from 'react'
import { globalStyles } from '../lib/styles'
import { Icon } from 'react-native-elements'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [userType, setUserType] = useState<any>('')

  const data: SelectItem[] = [{ text: 'Member', value: "Member" }, { text: 'Coordinator', value: "Coordinator" }, { text: 'Vice President', value: "Vice President" }]


  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, user_type`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setUserType(data.user_type)
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
    website,
    avatar_url,
    user_type
  }: {
    username: string
    website: string
    avatar_url: string
    user_type: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        user_type,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
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
    <View style={globalStyles.container}>
      <View style={globalStyles.uploadPhoto}>
        <Icon name={'camera'} tvParallaxProperties={undefined} type='font-awesome'></Icon>
      </View>
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
          autoCapitalize={'none'}/>
      </View>
      <View style={globalStyles.verticallySpaced}>
        <Input
          label="LinkedIn profil linkje"
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
          autoCompleteType={undefined}
          labelStyle={globalStyles.labelText}
          inputStyle={globalStyles.inputText}
          leftIcon={{ 'type': 'font-awesome', 'name': 'linkedin', 'size': 30 }}
          autoCorrect={false}
          autoCapitalize='none'/>
      </View>
      <View style={[globalStyles.verticallySpaced, globalStyles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl, user_type: userType })}
          disabled={loading}
        />
      </View>
      <View style={globalStyles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  )
}
