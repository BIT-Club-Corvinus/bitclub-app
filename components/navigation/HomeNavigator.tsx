import { AuthImplicitGrantRedirectError, Session } from "@supabase/supabase-js";
import React from "react";
import { useEffect, useState } from "react";
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Office from "../Office";
import BitNews from "../news/BITNewsScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, View } from "react-native";
import CustomTabBar from "./CustomTabBar";
import Agenda from "../calendar_events/AgendaScreen";
import More from "../More";
import Main from "../Main";

export default function Home() {
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

    const Tab = createBottomTabNavigator();

    return (
        <SafeAreaView style={{ flex: 1}}>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props}/>} screenOptions={Platform.OS==='ios'?
                {
                headerShown: false,
                tabBarActiveBackgroundColor: 'rgba(191, 240, 207, 1)',
                tabBarActiveTintColor: '#f69133',
                tabBarInactiveBackgroundColor: 'rgba(191, 240, 207, 1)',
                tabBarInactiveTintColor: '#12b0b0',
                tabBarLabelStyle: {
                    fontFamily: 'EncodeSans_600SemiBold',
                    fontSize: 14,
                    paddingBottom: '10%',
                    textAlign: 'center'
                },
                tabBarStyle: {
                    elevation: 240,
                    shadowOffset: {
                        width: 0,
                        height: 20,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    shadowColor: '#12b0b0',
                    borderColor: 'rgba(191, 240, 207, 1)',
                    paddingBottom: 0,
                    height: '10%',
                    alignItems: 'center',
                },
            }: {
                headerShown: false,
                tabBarActiveBackgroundColor: 'rgba(191, 240, 207, 1)',
                tabBarActiveTintColor: '#f69133',
                tabBarInactiveBackgroundColor: 'rgba(191, 240, 207, 1)',
                tabBarInactiveTintColor: '#12b0b0',
                tabBarLabelStyle: {
                    fontFamily: 'EncodeSans_600SemiBold',
                    fontSize: 14,
                    paddingBottom: '10%',
                    textAlign: 'center'
                },
                tabBarStyle: {
                    elevation: 240,
                    shadowOffset: {
                        width: 0,
                        height: 20,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 20,
                    shadowColor: '#12b0b0',
                    borderColor: 'rgba(191, 240, 207, 1)',
                    height: '10%',
                    alignItems: 'center'
                },
            }}>
                <Tab.Screen name="Iroda" component={Office}/>
                <Tab.Screen name="Események" component={Agenda}/>
                <Tab.Screen name="CTA" component={Main}/>
                <Tab.Screen name="BIT News" component={BitNews}/>
                <Tab.Screen name="Egyebek" component={More}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}