import { useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import React from 'react'
import { globalStyles } from '../lib/styles'
import Login from './Login'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, ImageBackground, Image, Pressable, ScrollView} from 'react-native'


const Welcome = ({navigation}: {navigation: any}) => {
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
  if (!loaded) {
    return null
  }
  return (
    <ImageBackground source={require('../assets/background_pattern.png')} style={globalStyles.backgroundPattern}>
        <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%', flexDirection: 'column', paddingHorizontal: 32, paddingBottom: 72}} contentContainerStyle={{justifyContent: 'flex-end', alignItems: 'center'}}>
            <Image source={require('../assets/BIT-new-logo-FULL-white.png')} style={globalStyles.welcomeLogo}/>
            <Text style={globalStyles.welcomeText}>
            “BITizennek lenni egy életérzés, a konstans Nyo-mode pedig még a véredet is #12b0b0-ra színezi”
            </Text>
            <Pressable style={globalStyles.welcomeButton1} onPress={() => navigation.navigate('Leendő Bitizeneknek')}>
                <Text style={{fontFamily: 'EncodeSans_600SemiBold'}}>Még nem vagyok BITizen!</Text>
            </Pressable>
            <Pressable style={globalStyles.welcomeButton2} onPress={() => navigation.navigate('Bejelentkezés')}>
                <Text style={{fontFamily: 'EncodeSans_600SemiBold', color: '#1ee7e7', textDecorationStyle: 'solid', textDecorationLine: 'underline', textDecorationColor: '#1ee7e7'}}>BITizen vagyok, belépek!</Text>
            </Pressable>
        </ScrollView>
    </ImageBackground>
  )
}

export default Welcome