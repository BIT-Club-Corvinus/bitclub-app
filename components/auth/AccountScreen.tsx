import { useState, useEffect, useContext } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert, Text, TextInput, Pressable, SafeAreaView, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import React from 'react'
import ProfileContext from '../../lib/contexts/ProfileContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPersonCircleMinus, faRightFromBracket, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ScrollView } from 'react-native-gesture-handler'



export default function Account() {
  const { session, profile, team, role } = useContext(ProfileContext)

  async function deleteAccount() {
    try {
      logOut()
      const { data, error } = await supabase.functions.invoke('delete_user_account');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#12b0b0' }}>
      <View style={{ flex: 1 / 6, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.header}>Profilom</Text>
      </View>
      <View style={styles.modalView}>
        <ScrollView style={{marginBottom: 100, flex: 1}} bounces={false}>
          <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Felhasználónév</Text>
          <TextView item={profile} attributeName='username' placeHolderText={team!} disabled={false} />
          <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Team</Text>
          <TextView item={profile} attributeName='team' placeHolderText={team!} disabled={true} />
          <Text style={{ marginHorizontal: 16, marginTop: 16, fontFamily: 'EncodeSans_700Bold' }}>Szerepkör</Text>
          <TextView item={profile} attributeName='role' placeHolderText={role!} disabled={true} />
          <View style={{ flexDirection: 'column', marginTop: 32 }}>
            <TouchableOpacity style={[styles.input, { justifyContent: 'center', alignItems: 'center', marginBottom: 0, flexDirection: 'row' }]} onPress={logOut}>
              <FontAwesomeIcon icon={faRightFromBracket} size={20} style={{ marginHorizontal: 8 }} />
              <Text style={{ color: '#000', fontFamily: 'EncodeSans_700Bold', fontSize: 20, textAlign: 'center', }}>Kijelentkezés</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.input, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]} onPress={deleteAccount}>
              <FontAwesomeIcon icon={faTrash} size={20} style={{ marginHorizontal: 8 }} color='#ff0800' />
              <Text style={{ color: '#ff0800', fontFamily: 'EncodeSans_700Bold', fontSize: 20, textAlign: 'center', }}>Fiók törlése</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const TextView = ({ item, attributeName, placeHolderText, disabled }: { item: any, attributeName: string, placeHolderText: string, disabled: boolean }) => {
  return (
    <TextInput style={styles.input} placeholder={item[attributeName] ? item[attributeName]!.toString() : placeHolderText} editable={!disabled} />
  );
}

async function logOut() {

  try {
    let { error } = await supabase.auth.signOut()

    if (error) {
      throw error;
    }
  } catch (error) {
    Alert.alert('Nem sikerült kijelentkezni')
  }

}




const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 17,
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
  },
})