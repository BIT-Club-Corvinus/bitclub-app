import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View, Text, Image, TextInput } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Icon, Input } from 'react-native-elements'
import { useFonts } from 'expo-font'
import { globalStyles } from '../lib/styles'
import { LinearGradient } from 'expo-linear-gradient'
import Login from './Login'
import Register from './Register'
import Login from './Login'

export default function Main({navigation}: {navigation: any}) {
    const [loaded] = useFonts({
        'EncodeSans': require('../assets/fonts/EncodeSans/EncodeSans-Medium.ttf'),
        'EncodeSans-Bold': require('../assets/fonts/EncodeSans/EncodeSans-Bold.ttf'),
        'EncodeSans-Light': require('../assets/fonts/EncodeSans/EncodeSans-Light.ttf')
    });
    const [screenState, setScreenState] = useState('main')

    if (!loaded) {
        return null;
    }

    const bit_logo = require("../assets/BIT-new-logo-FULL-white.png")
    const bit_web = require("../assets/halo_bit.png")

    if(screenState=='register') {
        return <Register/>
    }
    else if(screenState =='login') {
        return <Login/>
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