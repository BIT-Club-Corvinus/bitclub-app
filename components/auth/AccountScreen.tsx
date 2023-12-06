import { useState, useEffect, useContext } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, Text, TextInput, Pressable, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import React from 'react'
import ProfileContext from '../../lib/contexts/ProfileContext'


export default function Account() {
  const { session, profile, team } = useContext(ProfileContext)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#12b0b0' }}>
      <View style={{ flex: 1 / 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.header}>Profilom</Text>
      </View>
      <View style={styles.modalView}>
        <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Felhasználónév</Text>
        <TextView item={profile} attributeName='username' placeHolderText={team!} />
        <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Team</Text>
        <TextView item={profile} attributeName='team' placeHolderText={team!} />
      </View>
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
  header: {
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    borderRadius: 25,
    color: 'white'
  },
  modalView: {
    backgroundColor: '#efefef',
    flex: 5 / 6,
    zIndex: 2,
    borderRadius: 33,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
})