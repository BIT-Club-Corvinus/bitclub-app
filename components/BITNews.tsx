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
import AuthContext from "../lib/AuthContext";

type News = {
    id: number
    title: string
    sect_president: string
    sect_HR: string
    sect_BD: string
    sect_TD: string
    sect_Marketing: string
    weekly_BITizen1: string
    weekly_BITizen2: string
    BITizen1_img: string
    BITizen2_img: string
    BITizen_desc: string
}

export default function BitNews() {
    const { session } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<Array<News>>([]);
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
            getNews();
        }
    }, [session])


    async function getNews() {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const { data, error, status } = await supabase
                .from<News>('news')
                .select('*')

            if (error && status !== 406) {
                throw error
            }
            if (data) {
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

    return (
        <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={[globalStyles.gradient2, { alignItems: 'center' }]} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
            {/*Ide készítsétek el a BIT news oldal UI-ját (milyen elemek fognak megjelenni, hogyan kerülsz át arra az oldalra ahol részletesen el tudod olvasni az adott BIT news-t., stb.), az oldal alaphátterét megadtam már :) A függvényeket segítségül megírom helyettetek, hogy először tudjatok a UI-ra koncentrálni */}
        </LinearGradient>
    )
}

