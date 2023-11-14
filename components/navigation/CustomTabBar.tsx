// CustomTabBar.tsx
import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar, faCalendarDay, faDoorClosed, faDoorOpen, faHome, faList, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../lib/AuthContext';
import Office from '../Office';
import { supabase } from '../../lib/supabase';

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { online, setOnline, setLoading, session} = useContext(AuthContext)
  
  
  async function updateOnlineStatus({ online }: { online: boolean }) {
    try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')

        setOnline(online)

        const updates = {
            id: session?.user.id,
            online
        }

        let { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            throw error
        }
        else {
            if (online) Alert.alert("Beléptél az irodába!")
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
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {

        const isFocused = state.index === index;

        const tabBarColor = isFocused ? '#f69133' : '#12b0b0'
        const ctaColor = online ? '#f69133' : '#12b0b0'

        const ctaButton = () => {
          const handlePress = () => {
            updateOnlineStatus({ online: !online })
          }
          return (
            <TouchableOpacity style={[styles.ctaButton, { backgroundColor: ctaColor}]} onPress={handlePress}>
              <FontAwesomeIcon icon={online ? faDoorOpen : faDoorClosed} size={35} color='#ffffff' />
            </TouchableOpacity>
          )

        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };


        return (
          <TouchableOpacity
            onPress={onPress}
            key={route.key}
          >
            {
              index === 0
                ? <FontAwesomeIcon icon={faHome} size={30} color={tabBarColor} />
                : index === 1 ? <FontAwesomeIcon icon={faCalendarDay} size={30} color={tabBarColor} />
                  : index === 2 ? ctaButton()
                    : index === 3 ? <FontAwesomeIcon icon={faNewspaper} size={30} color={tabBarColor} />
                      : <FontAwesomeIcon icon={faList} size={30} color={tabBarColor} />
            }
          </TouchableOpacity>
        );
      })

      }
    </View>

  );


};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  tabButton: {
    // Normal tab button style
  },
  tabButtonFocused: {
    // Focused tab button style
  },
  ctaButton: {
    // Style for your elevated CTA button
    borderRadius: 35,
    elevation: 4,
    width: 70,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: -35,
  },
  ctaText: {
    color: '#fff',
  },
  // Add more styles as needed
});

export default CustomTabBar;