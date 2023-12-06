import { useState, useEffect, useContext } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import React from 'react'
import ProfileContext from '../../lib/contexts/ProfileContext'


export default function Account() {
  const { session, profile, team } = useContext(ProfileContext)

  return (
    <SafeAreaView>
      <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Felhasználónév</Text>
      <TextView item={profile} attributeName='username' placeHolderText={team!} />
      <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Team</Text>
      <TextView item={profile} attributeName='team' placeHolderText={team!}/>
    </SafeAreaView>
  )
}

const TextView = ({ item, attributeName, placeHolderText }: { item: any, attributeName: string, placeHolderText: string }) => {
  return (
    <TextInput style={styles.input} placeholder={item[attributeName] ? item[attributeName].toString() : placeHolderText} />
  );
}


const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})