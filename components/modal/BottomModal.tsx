import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from './Backdrop';
import { EventType } from '../../lib/types/Event';
import { News } from '../../lib/types/News';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const BottomModal = ({ reference, item }: { reference: any, item: any }) => {

    useEffect(() => {
    }, [])
    // ref
    const bottomSheetModalRef = reference;

    // variables
    const snapPoints = useMemo(() => ['25%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const handleClose = () => {
        reference.current?.close();
    }

    // renders
    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backdropComponent={CustomBackdrop}
                enablePanDownToClose={true}
            >
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={handleClose} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faXmark} size={26} style={{ marginBottom: 24}} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'EncodeSans_800ExtraBold', fontSize: 26, marginBottom: 16 }}>{item?.title!}</Text>
                    {
                        item?.place != null ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                                <Text style={styles.contentText}>{item?.place!}</Text>
                                <Text style={styles.contentText}>{item?.date!}</Text>
                            </View>
                            :
                            <View>
                                <Text style={styles.contentText}>{item?.date!}</Text>
                            </View>

                    }
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

export default BottomModal

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'column',
        paddingHorizontal: 24,
        paddingVertical: 0
    },
    contentText: {
        fontFamily: 'EncodeSans_500Medium',
        fontSize: 16
    }
})