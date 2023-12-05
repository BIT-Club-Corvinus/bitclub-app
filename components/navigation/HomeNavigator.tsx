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
import { Alert, Platform, View } from "react-native";
import CustomTabBar from "./CustomTabBar";
import Agenda from "../calendar_events/AgendaScreen";
import More from "../More";
import Main from "../Main";
import EventsContext from "../../lib/contexts/EventContext";
import ProfileContext from "../../lib/contexts/ProfileContext";
import { EventType } from "../../lib/types/Event";
import { supabase } from "../../lib/supabase";
import NewsContext from "../../lib/contexts/NewsContext";
import { News } from "../../lib/types/News";
import AgendaScreen from "../calendar_events/AgendaScreen";
import { AgendaSchedule } from "react-native-calendars";
import MoreNavigator from "./MoreNavigator";

export default function Home() {
    const { session, loading, setLoading } = useContext(ProfileContext)
    const [events, setEvents] = useState<AgendaSchedule | any>(undefined)
    const [news, setNews] = useState<News[] | null>(null)

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
        getNews();

        const channel = supabase.channel('public:news')
        const profiles = channel
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'news' },
                (payload) => {
                    getNews()
                }
            )
            .subscribe()
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
            }
            else {
                console.log('Nincsenek események!')
            }

        } catch (error) {

        }
    }

    async function getNews() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from('news')
                .select('*')

            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setNews(data)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <EventsContext.Provider value={{ events, setEvents }}>
            <NewsContext.Provider value={{news, setNews}}>
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
                        <Tab.Screen name="Események" component={AgendaScreen} />
                        <Tab.Screen name="CTA" component={Main} />
                        <Tab.Screen name="BIT News" component={BitNews} />
                        <Tab.Screen name="Egyebek" component={MoreNavigator} />
                    </Tab.Navigator>
                </SafeAreaView>
            </NewsContext.Provider>
        </EventsContext.Provider>

    )
}