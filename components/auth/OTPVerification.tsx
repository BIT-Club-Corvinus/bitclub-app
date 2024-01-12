import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { supabase } from '../../lib/supabase';
import ProfileContext from '../../lib/contexts/ProfileContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const OTPVerification = ({ route }: { route: any }) => {
    const input = useRef<OTPTextView>(null);
    const [otpInput, setOtpInput] = useState<string>("");

    async function verifyOTP() {
        const {
            error,
        } = await supabase.auth.verifyOtp({
            email: route.params.email,
            token: otpInput,
            type: 'email',
        })
        if (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
                    <Text style={styles.header}>Írd be a megerősítő email-ben található 6 jegyű kódot!</Text>
                    <OTPTextView
                        ref={input}
                        keyboardType='numeric'
                        handleTextChange={setOtpInput}
                        containerStyle={styles.textInputContainer}
                        textInputStyle={styles.roundedTextInput}
                        inputCount={6}
                        tintColor={'#12b0b0'}
                    />
                    <TouchableOpacity style={styles.verifyButton} onPress={verifyOTP}>
                        <Text style={styles.buttonText}>Megerősítés</Text>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default OTPVerification

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingBottom: 32
    },
    textInputContainer: {
        marginBottom: 32,
        marginHorizontal: 32
    },
    roundedTextInput: {
        borderRadius: 9,
        borderWidth: 4,
        fontSize: 18,
        fontFamily: 'EncodeSans_900Black'
    },
    verifyButton: {
        borderRadius: 9,
        padding: 12,
        backgroundColor: '#12b0b0',
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'EncodeSans_700Bold'
    },
    header: {
        fontFamily: 'EncodeSans_700Bold',
        fontSize: 26,
        color: 'black',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 40
    }
})