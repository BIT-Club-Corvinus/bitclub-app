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
import { Alert, View, Text, Pressable, ActivityIndicator, Image, ImageBackground, ScrollView} from "react-native";
import { globalStyles } from "../../lib/styles";
import { supabase } from "../../lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import ProfileContext from "../../lib/contexts/ProfileContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BITNewsDetails from "./BITNewsDetailsScreen";

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

export default function BitNews({navigation}: {navigation: any}) {
    const { session } = useContext(ProfileContext);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<any>([]);
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

    const Stack = createNativeStackNavigator();


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

    if (loading) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#12b0b0" />
        </View>
    )
    function BitNewsList(){
        return (
            <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={[globalStyles.gradient2, { alignItems: 'center' }]} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
                {/*Ide készítsétek el a BIT news oldal UI-ját (milyen elemek fognak megjelenni, hogyan kerülsz át arra az oldalra ahol részletesen el tudod olvasni az adott BIT news-t., stb.), az oldal alaphátterét megadtam már :) A függvényeket segítségül megírom helyettetek, hogy először tudjatok a UI-ra koncentrálni */}
                <ScrollView style={globalStyles.bitNewsList}
                contentContainerStyle={{height: '100%'}}>
                    {news.map((item: any) => (
                        <ImageBackground key={item.id} style={globalStyles.bitNewsContainer} source={{uri: item.thumbnail_img}} borderRadius={20} imageStyle={{opacity: 0.5}}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'column', flex: 1, paddingHorizontal: '5%'}}>
                                <Text style={globalStyles.bitNewsTitle}>{item.title}</Text>
                                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 16, color: 'white'}}>{item.date}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: '5%' }}>
                                <Pressable onPress={()=>{navigation.navigate('BitNewsElem', {paramKey: item})}}>
                                    <Ionicons name="ios-arrow-forward" size={30} color={'white'}/>
                                </Pressable>
                            </View>
                        </ImageBackground>
                    ))}
                </ScrollView>
            </LinearGradient>
        )    
    }

    return(
        <Stack.Navigator>
            <Stack.Screen name="BitNewsLista" component={BitNewsList}
            options={{
                headerShown: false
            }}/>
            <Stack.Screen name="BitNewsElem" component={BITNewsDetails} options={{
                title: 'BIT News',
                headerBackTitle: 'Vissza',
                headerBackTitleStyle: {
                    fontFamily: 'EncodeSans_600SemiBold'
                },
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#12b0b0'
                },
                headerTitleStyle: {
                    fontFamily: 'EncodeSans_600SemiBold'
                }
            }}/>
        </Stack.Navigator>
    )
}

