import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from '../More';
import Account from '../auth/AccountScreen';

const Stack = createStackNavigator();

function MoreNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Menü" component={More} options={{
                headerShown: false
            }}/>
            <Stack.Screen name="Profilom" component={Account} options={{
                headerBackTitle: 'Vissza',
                headerBackTitleStyle: {
                    fontFamily: 'EncodeSans_400Regular',
                },
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: '#12b0b0',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0
                },
                headerTitle: '',
            }}/>
        </Stack.Navigator>
    );
}

export default MoreNavigator;
