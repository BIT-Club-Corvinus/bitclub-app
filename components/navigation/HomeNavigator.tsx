import React, { useContext } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import CustomTabBar from "./CustomTabBar";
import Agenda from "../calendar_events/AgendaScreen";
import More from "../More";
import Main from "../Main";
import EventsContext from "../../lib/contexts/EventContext";
import ProfileContext from "../../lib/contexts/ProfileContext";
import { EventType } from "../../lib/types/Event";
import { supabase } from "../../lib/supabase";

export default function Home() {
    const { session, loading, setLoading } = useContext(ProfileContext)
    const [events, setEvents] = useState<EventType[] | null>(null)

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

    useEffect(() => {
        getEvents();
    }, [session])

    async function getEvents() {
        const today = new Date().toISOString().split('T')[0];

        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('events')
                .select('*')
                .gte('date', today)
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setEvents(data)
                console.log(events)
            }
            else {
                console.log('Nincsenek események!')
            }

        } catch (error) {

        }
    }

    return (
        <EventsContext.Provider value={{ events, setEvents }}>
            <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={Platform.OS === 'ios' ?
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
                    } : {
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
                    <Tab.Screen name="Iroda" component={Office} />
                    <Tab.Screen name="Események" component={Agenda} />
                    <Tab.Screen name="CTA" component={Main} />
                    <Tab.Screen name="BIT News" component={BitNews} />
                    <Tab.Screen name="Egyebek" component={More} />
                </Tab.Navigator>
            </SafeAreaView>
        </EventsContext.Provider>

    )
}