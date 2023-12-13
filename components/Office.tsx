import React, { useContext, useRef } from "react";
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
import { Alert, View, Text, Pressable, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import { globalStyles } from "../lib/styles";
import { supabase } from "../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import ProfileContext from "../lib/contexts/ProfileContext";
import { SafeAreaView } from "react-native-safe-area-context";
import EventsContext from "../lib/contexts/EventContext";
import { EventType } from "../lib/types/Event";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import NewsContext from "../lib/contexts/NewsContext";
import { News } from "../lib/types/News";
import BottomModal from "./modal/BottomModal";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

export default function Office({ navigation }: { navigation: any }) {
    const { session, online, setOnline, loading, setLoading, profile, setProfile, setTeam, setRole } = useContext(ProfileContext)
    const { events } = useContext(EventsContext)
    const { news } = useContext(NewsContext)
    const [peopleInOffice, setPeopleCount] = useState(0)
    const bottomSheetRef = useRef<BottomSheet>(null)

    useEffect(() => {
        if (session) {
            //supabase.auth.refreshSession();
            getOnlineUsers();
            getProfile();
        }
        const channel = supabase.channel('public:profiles')
        const profiles = channel
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'profiles' },
                (payload) => {
                    getOnlineUsers()
                }
            )
            .subscribe()
    }, [session])


    async function getProfile() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase
                .from('profiles')
                .select('*, teams(name), roles(name)')
                .eq('userPK', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setProfile(data)
                setOnline(data?.online)
                setTeam(data.teams.name)
                setRole(data.roles.name)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    async function getOnlineUsers() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('online', true)
            if (error && status !== 406) {
                throw error
            }
            if (data) {
                setPeopleCount(data.length)
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#12b0b0" />
        </View>
    )

    const renderEvent = ({ item }: { item: EventType }) => {
        const flagColor = item.type === 'Közösségi' ? '#f69133' : '#12b0b0'
        return (
            <TouchableOpacity style={styles.eventCard} onPress={handlePress}>
                <View style={{ width: 5, height: '100%', backgroundColor: flagColor, marginRight: 16 }}></View>
                <View style={{ flexDirection: 'column', flex: 3 / 5 }}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <Text>{item.place}</Text>
                </View>
                <Text style={{ flex: 1 / 3, fontFamily: 'EncodeSans_600SemiBold' }}>{item.date}</Text>
                <FontAwesomeIcon icon={faAngleRight} />
            </TouchableOpacity>
        )
    }

    const renderNews = ({ item }: { item: News }) => {
        return (
            <TouchableOpacity onPress={handlePress}>
                <ImageBackground key={item.id} style={styles.newsCard} source={{ uri: item.thumbnail_img }} borderRadius={9} imageStyle={{ opacity: 0.5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1, paddingHorizontal: '5%' }}>
                        <Text style={globalStyles.bitNewsTitle}>{item.title}</Text>
                        <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 16, color: 'white' }}>{item.date}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: '5%' }}>
                        <FontAwesomeIcon icon={faAngleRight} size={18} color="white" />
                    </View>
                </ImageBackground>
            </TouchableOpacity>

        )
    }

    const handlePress = () => {
        bottomSheetRef.current?.expand();
    }

    return (
        <SafeAreaView style={styles.backgroundView}>
            <View style={styles.titleView}>
                <Text style={{ fontFamily: 'EncodeSans_700Bold', color: 'white', fontSize: 30, paddingHorizontal: 24, paddingTop: 24 }}>Helló {profile?.username}!</Text>
                <Text style={{ fontFamily: 'EncodeSans_600SemiBold', color: 'white', fontSize: 20, paddingHorizontal: 24, paddingTop: 8 }}>Most {peopleInOffice} tag van az irodában</Text>
            </View>
            <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={styles.modalTitle}>Közelgő események</Text>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'EncodeSans_600SemiBold', color: '#12b0b0', fontSize: 12, marginRight: 5 }}>Összes</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={events}
                    renderItem={renderEvent}
                    style={{ flex: 1 / 4, elevation: 10 }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={styles.modalTitle}>Legfrissebb hírek</Text>
                    <TouchableOpacity>
                        <Text style={{ fontFamily: 'EncodeSans_600SemiBold', color: '#12b0b0', fontSize: 12, marginRight: 5 }}>Összes</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={news}
                    renderItem={renderNews}
                    style={{ flex: 1 / 3 }}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                />
                <BottomModal reference={bottomSheetRef} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backgroundView: {
        backgroundColor: '#12b0b0',
        flex: 1,
        zIndex: 1
    },
    titleView: {
        backgroundColor: 'transparent',
        flex: 1 / 6
    },
    modalView: {
        backgroundColor: '#efefef',
        flex: 5 / 6,
        zIndex: 2,
        borderRadius: 33,
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    modalTitle: {
        fontFamily: 'EncodeSans_700Bold',
        color: 'black',
        fontSize: 18,
        marginTop: 12,
        marginBottom: 4
    },
    eventCard: {
        borderRadius: 9,
        flexDirection: 'row',
        marginTop: 8,
        paddingVertical: 16,
        borderWidth: 2,
        borderColor: '#12b0b0',
        paddingHorizontal: 16,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    eventTitle: {
        fontFamily: 'EncodeSans_700Bold',
        fontSize: 18,
        marginBottom: 4
    },
    newsCard: {
        marginTop: 8,
        backgroundColor: 'black',
        borderRadius: 9,
        flex: 1 / 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: '5%',
    }
})


