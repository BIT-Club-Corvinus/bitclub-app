import { Session } from "@supabase/supabase-js";
import React from "react";
import { useEffect, useState } from "react";
import { useFonts } from 'expo-font'
import { Alert, View, Text, Pressable } from "react-native";
import { globalStyles } from "../lib/styles";
import { supabase } from "../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { withTheme } from "react-native-elements";

export default function Home({ session }: { session: Session }) {
    const [online, setOnline] = useState(true)
    const [loading, setLoading] = useState(true)
    const [officeMinutes, setMinutesInOffice] = useState(0)
    const [peopleInOffice, setPeopleCount] = useState(0)
    const [loaded] = useFonts({
        'EncodeSans': require('../assets/fonts/EncodeSans/EncodeSans-Medium.ttf'),
        'EncodeSans-Bold': require('../assets/fonts/EncodeSans/EncodeSans-Bold.ttf'),
        'EncodeSans-Light': require('../assets/fonts/EncodeSans/EncodeSans-Light.ttf'),
        'Bugfast': require('../assets/fonts/Bugfast400.ttf')
    });

    useEffect(() => {
        if (session) {
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
                .select(`online`)
                .eq('id', session?.user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setOnline(data.online)
            }
            console.log(data?.online)
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
                .select(`username, namevisibility, minutesinoffice, online`)
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
            setLoading(true)
        }
    }

    async function updateOnlineStatus({ online }: { online: boolean }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            setOnline(previousState => !previousState)

            const updates = {
                id: session?.user.id,
                online
            }

            let { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
            else {
                if (online) Alert.alert("Beléptél az irodába!")
                else Alert.alert("Kiléptél az irodából!")
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    
    if(!loaded) return null;

    return (
        <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={globalStyles.gradient2} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
            {   peopleInOffice != 0 ?
                    <View style={[globalStyles.container, {padding: '5%'}]}>
                        <Text style={[globalStyles.mt20percent, {fontSize: 36, fontFamily: 'EncodeSans-Bold', color: 'white'}]}>Most</Text>
                        <Text style={{fontSize: 200, fontFamily: 'Bugfast'}}>{peopleInOffice}</Text>
                        <Text style={{fontSize: 36, fontFamily: 'EncodeSans-Bold', color: 'white'}}>tag van az irodában</Text>
                    </View>
                :   <Text style={[globalStyles.mt20percent, {fontFamily: 'EncodeSans-Bold', fontSize: 40, textAlign: "center"}]}>Most nincs senki az irodában</Text>
            }
            <Pressable style={[globalStyles.mt20percent, globalStyles.button]} onPress={() => { updateOnlineStatus({ online: !online }) }}>
                {!online ? <Text style={globalStyles.buttonText}>Bemegyek az irodába!</Text> : <Text style={globalStyles.buttonText}>Kilépek az irodából!</Text>}
            </Pressable>
            <Pressable style={[globalStyles.mt20, globalStyles.logoutButton]} onPress={async () => await supabase.auth.signOut()}>
                <Text style={globalStyles.buttonText}>Kijelentkezés</Text>
            </Pressable>
        </LinearGradient>
    )
}


