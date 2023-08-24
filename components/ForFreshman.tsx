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
import { View, Text, ImageBackground, Image, Pressable } from 'react-native'
import { BlurView } from 'expo-blur'
import Ionicons from '@expo/vector-icons/Ionicons';


const ForFreshman = ({ navigation }: { navigation: any }) => {

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
      <View style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%', paddingHorizontal: 16, paddingTop: 96 }}>
        <Text style={[globalStyles.title, { marginVertical: 32 }]}>Hogyan válhatsz BITizenné?</Text>
        <Pressable style={globalStyles.bigBlurContainerWrapper} onPress={() => navigation.navigate('Toborzás')}>
          <BlurView intensity={40} style={globalStyles.blurContainer}>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 32, marginTop: 32, fontSize: 20 }}>I. Ismerj meg minket!</Text>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 32, fontSize: 16, width: '67%', marginVertical: 24 }}>
              Nézd meg, mikor és hol találkozhatsz velünk!
            </Text>
            <Ionicons name='md-play-outline' size={30} color={'#1ee7e7'} />
          </BlurView>
        </Pressable>
        <Pressable style={globalStyles.smallBlurContainerWrapper}>
          <BlurView intensity={40} style={globalStyles.blurContainer}>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 32, marginTop: 16, fontSize: 16 }}>II. Jelentkezz!</Text>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 32, fontSize: 14, width: '67%', marginVertical: 24 }}>
              Jelentkezz hozzánk, hogy téged is átjárjon a Nyo-mode!
            </Text>
          </BlurView>
        </Pressable>
        <Pressable style={globalStyles.smallBlurContainerWrapper}>
          <BlurView intensity={40} style={globalStyles.blurContainer}>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 32, marginTop: 24, fontSize: 16, width: '50%' }}>III. Kezdődjön a BITizen élet!</Text>
            <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 32, fontSize: 14, width: '80%', marginVertical: 24 }}>
              BITizen lettél? Tudd meg, hogyan kezdődik életed legjobb időszaka!
            </Text>
          </BlurView>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

export default ForFreshman