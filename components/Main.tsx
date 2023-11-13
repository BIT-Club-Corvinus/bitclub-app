import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Icon, Input } from 'react-native-elements'
import { globalStyles } from '../lib/styles'
import { LinearGradient } from 'expo-linear-gradient'
import Register from './auth/RegisterScreen'
import Login from './auth/LoginScreen'
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

export default function Main({navigation}: {navigation: any}) {
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
    const [screenState, setScreenState] = useState('main')

    if (!loaded) {
        return null;
    }

    const bit_logo = require("../assets/BIT-new-logo-FULL-white.png")
    const bit_web = require("../assets/halo_bit.png")

    if(screenState=='register') {
        return <Register navigation={undefined}/>
    }
    else if(screenState =='login') {
        return <Login navigation={undefined}/>
    }
    return (
        <View>
            <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={globalStyles.gradient2} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
                <View style={globalStyles.container}>
                    <Image source={bit_web} style={globalStyles.webImage}></Image>
                    <Image source={bit_logo} style={globalStyles.logo}></Image>
                </View>
                <View>
                    <View style={globalStyles.container}>
                        <View style={[globalStyles.whiteButton]}>
                            <Pressable onPress={navigation.navigate('Details')}>
                                <Text style={[globalStyles.buttonText2]}>Bejelentkezés</Text>
                            </Pressable>
                        </View>
                        <View style={[globalStyles.mt20, globalStyles.button]}>
                            <Pressable onPress={()=>{}}>
                                <Text style={[globalStyles.buttonText]}>Regisztráció</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </LinearGradient >

        </View>
    )
}