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

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <Home key={session.user.id} session={session} /> : <Main />}
    </View>
  )
}