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
import { View, Text, ImageBackground, Image, Pressable, ScrollView } from 'react-native'
import { BlurView } from 'expo-blur'
import Ionicons from '@expo/vector-icons/Ionicons';

const FreshmanHome = ({ navigation }: { navigation: any }) => {

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
        <ImageBackground
            source={require('../assets/background_pattern.png')}
            style={globalStyles.backgroundPattern}
        >
            <ScrollView style={{ backgroundColor: 'rgba(0,0,0,0.75)', }}>
                <View style={{paddingTop: 80, paddingBottom: 32}}>
                    <View style={{ width: '100%', height: '100%', paddingLeft: 14, flexDirection: 'row', justifyContent: 'center', }}>
                        <View style={{ height: '100%' }}>
                            <View style={{ width: 140, height: 120, marginBottom: 24, paddingTop: 8, marginTop: 16 }}>
                                <Text style={{ fontFamily: 'EncodeSans_900Black', color: 'white', fontSize: 20 }}>DSZ expo</Text>
                                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 12, color: 'white', paddingVertical: 16, paddingRight: 16 }}>Látogasd meg standunkat az egyetem Diákszervezeti Expoján!</Text>
                            </View>
                            <Image
                                source={require('../assets/bit_buli.png')}
                                style={{ width: 120, height: 120, marginBottom: 24, marginTop: 16, marginRight: 16 }}
                            ></Image>
                            <View style={{ width: 140, height: 120, marginBottom: 24, paddingTop: 8, marginTop: 8 }}>
                                <Text style={{ fontFamily: 'EncodeSans_900Black', color: 'white', fontSize: 20 }}>Infóest</Text>
                                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 12, color: 'white', paddingVertical: 16, paddingRight: 16 }}>Ha még kérdéseid vannak, gyere el infóestünkre szeptember 12-én, és tudj meg mindent!</Text>
                            </View>
                            <Image
                                source={require('../assets/bit_infoest.png')}
                                style={{ width: 120, height: 120, marginBottom: 16, marginTop: 16 }}
                            ></Image>
                        </View>
                        <View style={{ height: '100%' }}>
                            <Image source={require('../assets/roadmap_component.png')}></Image>
                        </View>
                        <View style={{ height: '100%' }}>
                            <Image
                                source={require('../assets/bit_expo.png')}
                                style={{ width: 120, height: 120, marginBottom: 16, marginTop: 16, marginLeft: 32 }}
                            ></Image>
                            <View style={{ width: 140, height: 120, marginBottom: 16, paddingTop: 16, paddingLeft: 16, marginTop: 16 }}>
                                <Text style={{ fontFamily: 'EncodeSans_900Black', color: 'white', fontSize: 20, textAlign: 'right' }}>Gólyanap</Text>
                                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 12, color: 'white', paddingVertical: 16, textAlign: 'right' }}>Bulizz velünk szeptember 7-én, és szerezz feledhetetlen élményeket!</Text>
                            </View>
                            <Image
                                source={require('../assets/bit_meetup.png')}
                                style={{ width: 120, height: 120, marginBottom: 16, marginTop: 40, marginLeft: 24 }}
                            ></Image>
                            <View style={{ width: 140, height: 120, marginBottom: 16, paddingTop: 8, marginTop: 16 }}>
                                <Text style={{ fontFamily: 'EncodeSans_900Black', color: 'white', fontSize: 20, textAlign: 'right' }}>Nyílt meetup</Text>
                                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 12, color: 'white', paddingVertical: 16, paddingLeft: 16, textAlign: 'right' }}>Kíváncsi vagy milyen eseményeken vehetsz részt BITizenként? Nyílt eseményünkön megtudhatod!</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </ImageBackground>
    )
}

export default FreshmanHome