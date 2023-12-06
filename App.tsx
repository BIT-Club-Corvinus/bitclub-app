import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import React from 'react'
import Office from './components/Office'
import Login from './components/auth/LoginScreen'
import Register from './components/auth/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
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
import ProfileContext from './lib/contexts/ProfileContext'
import Home from './components/navigation/HomeNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Welcome from './components/onboarding/Welcome'
import ForFreshman from './components/onboarding/ForFreshman'
import FreshmanHome from './components/onboarding/FreshmanHome'
import { Alert } from 'react-native'
import { UserProfile } from './lib/types/UserProfile'


export default function App() {

  const [session, setSession] = useState<Session | null>(null)
  const [online, setOnline] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [team, setTeam] = useState<string | null>(null)

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

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  if (!loaded) {
    return null
  }
  return (
    <ProfileContext.Provider value={{ session, setSession, online, setOnline, loading, setLoading, profile, setProfile, team, setTeam }}>
      <NavigationContainer>
        {session && session?.user ?
          <Home /> :
          <Stack.Navigator >
            <Stack.Screen
              name='Kezdőlap'
              component={Welcome}
              options={{ headerShown: false }} />
            <Stack.Screen
              name='Leendő Bitizeneknek'
              component={ForFreshman}
              options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: '',
                headerTintColor: 'white',
                headerTransparent: true,
                headerBackTitle: 'Vissza',
                headerBackTitleStyle: {
                  fontFamily: 'EncodeSans_300Light'
                }
              }} />
            <Stack.Screen
              name='Toborzás'
              component={FreshmanHome}
              options={{
                headerTransparent: true,
                headerTintColor: 'white',
                headerTitle: '',
                headerBackTitle: 'Vissza',
                headerBackTitleStyle: {
                  fontFamily: 'EncodeSans_300Light'
                }
              }}
            />
            <Stack.Screen name="Bejelentkezés" component={Login}
              options={{
                headerShown: true,
                headerTintColor: 'white',
                headerTransparent: true,
                headerTitle: ''
              }}
            />
            <Stack.Screen name='Regisztráció' component={Register}
              options={{
                headerStyle: {
                  backgroundColor: '#12b0b0'
                },
                headerTitle: '',
                headerBackTitleStyle: {
                  fontFamily: 'EncodeSans_500Medium'
                },
                headerTintColor: 'white',
                headerBackTitleVisible: false,
                headerShadowVisible: false
              }} />
          </Stack.Navigator>
        }
      </NavigationContainer>

    </ProfileContext.Provider>
    /* <View>
      {session && session.user ? <Home key={session.user.id} session={session} /> : <Main />}
    </View> */
  )
}