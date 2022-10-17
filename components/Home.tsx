import { Session } from "@supabase/supabase-js";
import React from "react";
import { useEffect, useState } from "react";
import { Alert, View, Text, Pressable} from "react-native";
import { globalStyles } from "../lib/styles";
import { supabase } from "../lib/supabase";

export default function Home({ session }: { session: Session }) {
    const [online, setOnline] = useState(false)
    const [loading, setLoading] = useState(true)
    const [officeMinutes, setMinutesInOffice] = useState(0)
    const [peopleInOffice, setPeopleCount] = useState(0)

    useEffect(() => {
        if (session) getOnlineUsers()
        const channel = supabase.channel('online-users')
            channel
            .on('postgres-changes', {event: 'UPDATE', schema: 'public', table: 'profiles' }, (payload: any) =>{
                console.log(payload)
            })
            .subscribe((status: string) => {
                if(status == 'SUBSCRIBED'){
                    getOnlineUsers()
                }
            })
    }, [session])

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

    async function updateOnlineStatus({online}:{online: boolean}) {
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
              if(online) Alert.alert("Beléptél az irodába!")
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

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.mt20percent}>Most {peopleInOffice} tag van az irodában</Text>
            <Pressable style={[globalStyles.mt20percent, globalStyles.button]} onPress={()=>{updateOnlineStatus({online: online})}}>
                <Text style={globalStyles.buttonText}>Bent vagyok az irodában!</Text>
            </Pressable>
        </View>
    )
}


