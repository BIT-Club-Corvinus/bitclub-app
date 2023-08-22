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
import { View, Text, ImageBackground, Image, Pressable} from 'react-native'


const Welcome = () => {
  return (
    <ImageBackground source={require('../assets/background_pattern.png')} style={globalStyles.backgroundPattern}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/BIT-new-logo-FULL-white.png')} style={globalStyles.welcomeLogo}/>
            <Text style={globalStyles.welcomeText}>
            “BITizennek lenni egy életérzés, a konstans Nyo-mode pedig még a véred is #12b0b0-ra színezi”
            </Text>
            <Pressable style={{width: '100%', backgroundColor: '#1ee7e7', padding: 16, justifyContent: 'center'}}>
                <Text>Még nem vagyok BITizen!</Text>
            </Pressable>
        </View>
    </ImageBackground>
  )
}

export default Welcome