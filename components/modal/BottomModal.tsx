import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from './Backdrop';

const BottomModal = ({reference}: {reference: any}) => {

    // ref
    const bottomSheetRef = reference;

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={['1%', '75%']}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            //backdropComponent={CustomBackdrop}
        >
            <View style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </View>
        </BottomSheet>
    )
}

export default BottomModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
})