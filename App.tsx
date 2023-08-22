import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { Session } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import React from 'react'
import Office from './components/Office'
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
import AuthContext from './lib/AuthContext'
import Home from './components/Home'
import { SafeAreaView } from 'react-native-safe-area-context'
import Welcome from './components/Welcome'


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
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      <NavigationContainer>
        {session && session?.user ?
          <Home /> :
          <Stack.Navigator >
            <Stack.Screen name='Kezdőlap' component={Welcome} options={{headerShown: false}}/>
            <Stack.Screen name="Bejelentkezés" component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name='Regisztráció' component={Register}
              options={{
                headerStyle: {
                  backgroundColor: '#12b0b0'
                },
                headerTitle: '',
                headerBackTitleStyle: {
                  fontFamily: 'EncodeSans_300Light'
                },
                headerTintColor: 'white',
                headerBackTitleVisible: false,
                headerShadowVisible: false
              }} />
          </Stack.Navigator>
        }
      </NavigationContainer>

    </AuthContext.Provider>
    /* <View>
      {session && session.user ? <Home key={session.user.id} session={session} /> : <Main />}
    </View> */
  )
}