import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from './Backdrop';
import { EventType } from '../../lib/types/Event';
import { News } from '../../lib/types/News';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


const BottomModal = ({ reference, item }: { reference: any, item: any }) => {
    const [initialRegion, setInitialRegion] = useState<any>({})

    useEffect(() => {
        setInitialRegion({ latitude: 47.48490, longitude: 19.06053, latitudeDelta: 0.001, longitudeDelta: 0.01})
    }, [])
    // ref
    const bottomSheetModalRef = reference;

    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);

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
                        <FontAwesomeIcon icon={faXmark} size={26} style={{ marginBottom: 24 }} />
                    </TouchableOpacity>
                    <ScrollView style={{ width: '100%' }}>
                        <Text style={{ fontFamily: 'EncodeSans_800ExtraBold', fontSize: 26, marginBottom: 16 }}>{item?.title!}</Text>
                        {
                            item?.place != null ?
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <Text style={styles.contentSubtitle}>{item?.place!}</Text>
                                        <Text style={styles.contentSubtitle}>{item?.date!}</Text>
                                    </View>
                                    <View style={{ marginTop: 32 }}>
                                        <Text style={styles.contentTitle}>Az eseményről röviden</Text>
                                        <Text style={styles.contentText}>{item?.description!}</Text>
                                    </View>
                                    <View style={{ marginTop: 24 }}>
                                        <Text style={styles.contentTitle}>Térkép, ha esetleg eltévednétek</Text>
                                    </View>
                                    <MapView region={initialRegion} style={{ height: 200, marginTop: 4 }}>
                                        <Marker coordinate={{ latitude: 47.48490607581476, longitude: 19.06053477238782 }}/>
                                    </MapView>
                                </View>
                                :
                                <View>
                                    <View>
                                        <Text style={styles.contentSubtitle}>{item?.date!}</Text>
                                    </View>
                                </View>
                        }
                    </ScrollView>
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
    contentSubtitle: {
        fontFamily: 'EncodeSans_500Medium',
        fontSize: 18
    },
    contentTitle: {
        fontFamily: 'EncodeSans_700Bold',
        fontSize: 18,
        marginBottom: 16
    },
    contentText: {
        fontFamily: 'EncodeSans_400Regular',
        fontSize: 16,
        textAlign: 'justify'
    }
})