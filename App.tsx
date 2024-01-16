import { useState, useEffect, useRef } from 'react'
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
import { Alert, Platform } from 'react-native'
import { UserProfile } from './lib/types/UserProfile'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import OTPVerification from './components/auth/OTPVerification'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Subscription } from 'expo-notifications'

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: any) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig!.extra?.eas.projectId,
    });
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  return token?.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<any>(false);
  const notificationListener = useRef<Subscription | any>();
  const responseListener = useRef<Subscription | any>();

  const [session, setSession] = useState<Session | null>(null)
  const [online, setOnline] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [team, setTeam] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

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
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])


  if (!loaded) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileContext.Provider value={{ session, setSession, online, setOnline, loading, setLoading, profile, setProfile, team, setTeam, role, setRole }}>
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
                  headerTitle: '',
                  headerBackTitleStyle: {
                    fontFamily: 'EncodeSans_500Medium'
                  },
                  headerTintColor: 'white',
                  headerBackTitleVisible: false,
                  headerShadowVisible: false,
                  headerTransparent: true
                }} />
              <Stack.Screen name='Megerősítés' component={OTPVerification}
                options={{
                  headerStyle: {
                    backgroundColor: '#f2f2f2'
                  },
                  headerTitle: '',
                  headerBackTitleStyle: {
                    fontFamily: 'EncodeSans_500Medium'
                  },
                  headerTintColor: 'black',
                  headerBackTitleVisible: false,
                  headerShadowVisible: false
                }} />
            </Stack.Navigator>
          }
        </NavigationContainer>

      </ProfileContext.Provider>
    </GestureHandlerRootView>

    /* <View>
      {session && session.user ? <Home key={session.user.id} session={session} /> : <Main />}
    </View> */
  )
}