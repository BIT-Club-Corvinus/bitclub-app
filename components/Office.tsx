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
import { Alert, View, Text, Pressable, ActivityIndicator } from "react-native";
import { globalStyles } from "../lib/styles";
import { supabase } from "../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import ProfileContext from "../lib/ProfileContext";

export default function Office() {
    const { session, online, setOnline, loading, setLoading } = useContext(ProfileContext)
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
        <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={[globalStyles.gradient2, { alignItems: 'center', paddingBottom: '20%', justifyContent: 'center' }]} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
            {peopleInOffice != 0 ?
                <View style={[globalStyles.container, { padding: '5%' }]}>
                    <Text style={[globalStyles.mt20percent, { fontSize: 36, fontFamily: 'EncodeSans_700Bold', color: 'white' }]}>Most</Text>
                    <Text style={{ fontSize: 150, fontFamily: 'EncodeSans_700Bold' }}>{peopleInOffice}</Text>
                    <Text style={{ fontSize: 36, fontFamily: 'EncodeSans_700Bold', color: 'white', textAlign: 'center' }}>tag van az irodában</Text>
                </View>
                : <Text style={[globalStyles.mt20percent, { fontFamily: 'EncodeSans_700Bold', fontSize: 40, textAlign: "center" }]}>Most nincs senki az irodában</Text>
            }
            <Pressable style={[globalStyles.mt20percent, globalStyles.button]} onPress={() => { }}>
                {!online ? <Text style={globalStyles.buttonText}>Bemegyek az irodába!</Text> : <Text style={globalStyles.buttonText}>Kilépek az irodából!</Text>}
            </Pressable>
            <Pressable style={[globalStyles.mt20, globalStyles.logoutButton]} onPress={async () => await supabase.auth.signOut()}>
                <Text style={globalStyles.buttonText}>Kijelentkezés</Text>
            </Pressable>
        </LinearGradient>
    )
}


