import React from "react";
import { View, Modal, StyleSheet, Text, ActivityIndicator } from "react-native";


function LoadingModal ({modalVisible, taskOngoing}: {modalVisible: boolean, taskOngoing: string}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ActivityIndicator size='large' color={'#12b0b0'}/>
                <Text style={styles.modalText}>{taskOngoing}</Text>
            </View>
        </View>
    </Modal>
  )
}

export default LoadingModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0008',
        paddingHorizontal: 24
    },
    modalView: {
        margin: 20,
        width: 'auto',
        height: 'auto',
        padding: 16,
        paddingHorizontal: 24,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginVertical: 16,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 16,
        fontFamily: 'EncodeSans_700Bold',
        color: 'black'
    }
})