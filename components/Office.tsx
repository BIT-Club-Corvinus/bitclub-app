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
import { Alert, View, Text, Pressable, ActivityIndicator, StyleSheet} from "react-native";
import { globalStyles } from "../lib/styles";
import { supabase } from "../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import ProfileContext from "../lib/ProfileContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Office() {
    const { session, online, setOnline, loading, setLoading, profile, setProfile } = useContext(ProfileContext)
    const [peopleInOffice, setPeopleCount] = useState(0)
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
                .select('*')
                .eq('userPK', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setProfile(data)
                setOnline(data?.online)
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



    if (!loaded) return null;

    if (loading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#12b0b0" />
        </View>
    )

    return (
        <SafeAreaView style={styles.backgroundView}>
            <View style={styles.titleView}>
                <Text style={{fontFamily: 'EncodeSans_700Bold', color: 'white', fontSize: 30}}>Helló {profile?.username}!</Text>
            </View>
            <View style={styles.modalView}>

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
        flex: 1/6
    },
    modalView: {
        backgroundColor: '#efefef',
        flex: 5/6,
        zIndex: 2
    }
})


