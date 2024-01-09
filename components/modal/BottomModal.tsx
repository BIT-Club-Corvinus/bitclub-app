import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from './Backdrop';
import { EventType } from '../../lib/types/Event';
import { News } from '../../lib/types/News';

const BottomModal = ({ reference, item }: { reference: any, item: any}) => {

    useEffect(() => {
    }, [])
    // ref
    const bottomSheetModalRef = reference;

    // variables
    const snapPoints = useMemo(() => ['25%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

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
                    <Text style={{fontFamily: 'EncodeSans_700Bold', fontSize: 26}}>{item?.title!}</Text>
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
        padding: 24
    },
})