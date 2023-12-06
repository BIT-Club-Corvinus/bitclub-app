import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileContext from '../lib/contexts/ProfileContext';
import { supabase } from '../lib/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGear, faBomb, faDice, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '../lib/types/UserProfile';



const More = ({ navigation }: { navigation: any }) => {

  const moreOptions = [
    { key: 'profile', label: 'Profilom', highlighted: false, iconName: <FontAwesomeIcon icon={faUser} size={30} color='#12b0b0' style={styles.icon}></FontAwesomeIcon> },
    { key: 'settings', label: 'Beállítások', highlighted: false, iconName: <FontAwesomeIcon icon={faGear} size={30} color='#12b0b0' style={styles.icon}></FontAwesomeIcon> },
    { key: 'piggie', label: 'Robbanó Röfik', highlighted: false, iconName: <FontAwesomeIcon icon={faBomb} size={30} color='#12b0b0' style={styles.icon}></FontAwesomeIcon> },
    { key: 'cluedo', label: 'Cluedo', highlighted: false, iconName: <FontAwesomeIcon icon={faDice} size={30} color='#12b0b0' style={styles.icon}></FontAwesomeIcon> },
    { key: 'voting', label: 'Szavazás', highlighted: false, iconName: <FontAwesomeIcon icon={faSquarePollVertical} size={30} color='#12b0b0' style={styles.icon} /> }
  ];

  const handlePress = (item: any) => {
    try {
      if (item.label !== 'Profilom') {
        throw Error;
      }
      else {
        navigation.navigate(item.label)
      }
    } catch (error) {
      Alert.alert('Ez a funkció hamarosan elérhető...')
    }
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={item.highlighted ? [styles.item, { marginBottom: 20 }] : styles.item} onPress={() => handlePress(item)}>
        {item.iconName}
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Menü
      </Text>
      <FlatList
        data={moreOptions}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18,
  },
  icon: {
    marginRight: 20
  },
  header: {
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    borderRadius: 25
  }
})
export default More