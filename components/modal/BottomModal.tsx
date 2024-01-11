import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import CustomBackdrop from './Backdrop';
import { EventType } from '../../lib/types/Event';
import { News } from '../../lib/types/News';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ReadMore from '@fawazahmed/react-native-read-more';


const BottomModal = ({ reference, item, navigation}: { reference: any, item: any, navigation: any}) => {

    useEffect(() => {
    }, [])
    // ref
    const bottomSheetModalRef = reference;

    // variables
    const snapPoints = useMemo(() => ['25%', '85%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        //console.log('handleSheetChanges', index);
    }, []);

    const handleClose = () => {
        reference.current?.close();
    }
    const navigateToNews = (routeName: string, item: any) => {
        navigation.navigate(routeName, {screen: 'BitNewsElem', params: {paramKey: item}, initial: false})
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
                    <View>
                        <Text style={{ fontFamily: 'EncodeSans_800ExtraBold', fontSize: 26, marginBottom: 16 }}>{item?.title!}</Text>
                        {
                            item?.place != null ?
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <Text style={styles.contentSubtitle}>{item?.place!}</Text>
                                        <Text style={styles.contentSubtitle}>{item?.date!}</Text>
                                    </View>
                                    <View style={{ marginTop: 32 }}>
                                        <Text style={styles.contentTitle}>Az eseményről röviden</Text>
                                        <Text style={styles.contentText}>{item?.description!}</Text>
                                    </View>
                                </ScrollView>
                                :
                                <View>
                                    <ScrollView >
                                        <View>
                                            <Text style={styles.contentSubtitle}>{item?.date!}</Text>
                                        </View>
                                        <View style={{ marginTop: 24, }}>
                                            <Text style={styles.contentTitle}>Elnöki ügy</Text>
                                            <ReadMore numberOfLines={12} style={styles.contentText} seeMoreStyle={styles.seeMoreText} seeMoreText='Tovább' onSeeMore={()=>navigateToNews('BIT News', item)}>
                                                {item?.sect_president!}
                                            </ReadMore>
                                        </View>
                                    </ScrollView>
                                </View>
                        }
                    </View>
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
        marginBottom: 12
    },
    contentText: {
        fontFamily: 'EncodeSans_400Regular',
        fontSize: 16,
        textAlign: 'justify'
    },
    seeMoreText: {
        fontFamily: 'EncodeSans_900Black',
        color: '#12b0b0',
        fontSize: 16
    }
})