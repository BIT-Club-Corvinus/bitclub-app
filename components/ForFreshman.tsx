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
import { View, Text, ImageBackground, Image, Pressable, Linking, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import Ionicons from '@expo/vector-icons/Ionicons';


const ForFreshman = ({ navigation }: { navigation: any }) => {

  const [recruitingStatus, setRecruitingStatus] = useState('')

  useEffect(() => {
    // Function to get the current date in the desired format
    const getCurrentDate = () => {
      const date = new Date();
      return date;
    };

    // Function to set status string based on date intervals
    const setStatusBasedOnDate = () => {
      const currentDate = getCurrentDate();
      const startDate1 = new Date('2023-08-23'); // Replace with your start dates
      const endDate1 = new Date('2023-09-22');   // Replace with your end dates
      const startDate2 = new Date('2023-09-23');
      const endDate2 = new Date('2023-10-06');

      if (currentDate >= startDate1 && currentDate <= endDate1) {
        setRecruitingStatus('Jelentkezés');
      } else if (currentDate >= startDate2 && currentDate <= endDate2) {
        setRecruitingStatus('Integráció');
      } else {
        setRecruitingStatus('Szorgalmi időszak');
      }
    };

    // Set the status string based on date intervals
    setStatusBasedOnDate();

  }, [])


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
      <ScrollView style={{ backgroundColor: 'rgba(0,0,0,0.75)', width: '100%', height: '100%', paddingHorizontal: 16, }} >
        <View style={{paddingTop: 80, alignItems: 'center'}}>
          <Text style={[globalStyles.title, { marginVertical: 32 }]}>Hogyan válhatsz BITizenné?</Text>
          <Pressable style={globalStyles.bigBlurContainerWrapper} onPress={() => navigation.navigate('Toborzás')} disabled={false}>
            <BlurView intensity={40} tint='default' style={globalStyles.blurContainer} blurReductionFactor={1.5}>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 32, marginTop: 32, fontSize: 20 }}>I. Ismerj meg minket!</Text>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 32, fontSize: 16, width: '67%', marginVertical: 24 }}>
                Nézd meg, mikor és hol találkozhatsz velünk!
              </Text>
              <Ionicons name='md-play-outline' size={30} color={'#1ee7e7'} />
            </BlurView>
          </Pressable>
          <Pressable style={globalStyles.smallBlurContainerWrapper} disabled={recruitingStatus == 'Jelentkezés' ? false : true} onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSe5UsFm_JobOMHyk9M6Umr2s8mZbpTSo7rF3UwTM0aqQMrB4g/viewform?usp=sf_link')}>
            <BlurView intensity={40} tint='default' style={globalStyles.blurContainer} blurReductionFactor={1.5}>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 28, marginTop: 0, fontSize: 16 }}>II. Jelentkezz!</Text>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 28, fontSize: 12, width: '67%', marginTop: 24 }}>
                Jelentkezz hozzánk, hogy téged is átjárjon a Nyo-mode!
              </Text>
            </BlurView>
          </Pressable>
          <Pressable style={[globalStyles.smallBlurContainerWrapper]}>
            <BlurView intensity={40} tint='default' style={globalStyles.blurContainer} blurReductionFactor={1.5}>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_900Black', marginHorizontal: 28, marginTop: '5%', fontSize: 16, width: '50%' }}>III. Kezdődjön a BITizen élet!</Text>
              <Text style={{ color: 'white', fontFamily: 'EncodeSans_500Medium', marginHorizontal: 28, fontSize: 12, width: '80%', marginVertical: 24 }}>
                BITizen lettél? Tudd meg, hogyan kezdődik életed legjobb időszaka!
              </Text>
            </BlurView>
          </Pressable>

        </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default ForFreshman