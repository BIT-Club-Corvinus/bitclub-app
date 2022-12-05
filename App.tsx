import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { useFonts } from 'expo-font'
import { Text, Image, Pressable } from 'react-native'
import { Session } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'
import { LinearGradient } from 'expo-linear-gradient'
import { globalStyles } from './lib/styles'
import Register from './components/Register'


function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <LinearGradient colors={['rgba(18, 176, 176, 1)', 'rgba(191, 240, 207, 1)']} style={globalStyles.gradient2} start={{ x: 0.4, y: 0 }} locations={[0.6, 0.95]}>
      <Image source={require("../bitclub-app/assets/halo_bit.png")} style={globalStyles.webImage}></Image>
      <Image source={require("../bitclub-app/assets/BIT-new-logo-FULL-white.png")} style={globalStyles.logo}></Image>

      <Pressable
        onPress={() => navigation.navigate('Bejelentkezés')}
        style={[globalStyles.whiteButton, globalStyles.mt20percent]}
      >
        <Text style={globalStyles.buttonText2}>Bejelentkezés</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Regisztráció')} style={[globalStyles.button, globalStyles.mt20]}>
        <Text style={[globalStyles.buttonText]}>Regisztráció</Text>
      </Pressable>
    </LinearGradient>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {

  const [session, setSession] = useState<Session | null>(null)
  const [loaded] = useFonts({
    'EncodeSans': require('../bitclub-app/assets/fonts/EncodeSans/EncodeSans-Medium.ttf'),
    'EncodeSans-Bold': require('../bitclub-app/assets/fonts/EncodeSans/EncodeSans-Bold.ttf'),
    'EncodeSans-Light': require('../bitclub-app/assets/fonts/EncodeSans/EncodeSans-Light.ttf')
  });

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
        <Stack.Screen name="Főoldal" component={HomeScreen}
          options={{ headerShown: false }} />
        <Stack.Screen name="Bejelentkezés" component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#12b0b0'
            },
            headerTitleStyle: {
              color: 'white',
              fontFamily: 'EncodeSans-Bold'
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
              fontFamily: 'EncodeSans-Bold'
            },
            headerBackTitleStyle: {
              fontFamily: 'EncodeSans-Light'
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