import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Login'
import Account from './components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import React from 'react'
import Home from './components/Home'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
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


export default function App() {

  const [session, setSession] = useState<Session | null>(null)
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
  if (session && session.user) {
    return <Home key={session.user.id} session={session}></Home>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Bejelentkezés" component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#12b0b0'
            },
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'EncodeSans_700Bold'
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen name='Regisztráció' component={Register}
          options={{
            headerStyle: {
              backgroundColor: '#12b0b0'
            },
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'EncodeSans_700Bold'
            },
            headerBackTitleStyle: {
              fontFamily: 'EncodeSans_300Light'
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
            headerShadowVisible: false
          }} />
      </Stack.Navigator>
    </NavigationContainer>
    /* <View>
      {session && session.user ? <Home key={session.user.id} session={session} /> : <Main />}
    </View> */
  )
}