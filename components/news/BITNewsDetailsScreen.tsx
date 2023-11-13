import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles } from '../../lib/styles'

export default function BITNewsDetails({ route }: { route: any }) {
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#12b0b0' }} style={{ backgroundColor: '#12b0b0' }}>
            <View style={{paddingHorizontal: '7.5%', justifyContent: 'space-between', height: '4%', paddingTop: '5%', marginBottom: '5%'}}>
                <Text style={globalStyles.bitNewsTitle}>{route.params.paramKey.title}</Text>
                <Text style={{ fontFamily: 'EncodeSans_500Medium', fontSize: 16, color: 'white' }}>{route.params.paramKey.date}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>Elnöki ügy</Text>
                <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.sect_president}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>HR Hírek</Text>
                <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.sect_HR}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>TD Tájékoztató</Text>
                <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.sect_TD}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>BD Beszámoló</Text>
                <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.sect_BD}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>Marketing Mozzanatok</Text>
                <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.sect_Marketing}</Text>
            </View>
            <View style={globalStyles.bitNewsContentContainer}>
                <Text style={globalStyles.bitNewsSubTitle}>A Hét Bitizenei</Text>
                <View style={{ paddingBottom: '0%', alignItems: 'center' }}>
                    <Image source={{ uri: route.params.paramKey.BITizen1_img }} style={globalStyles.bitizenImage} />
                    <Text style={globalStyles.bitizenName}>{route.params.paramKey.weekly_BITizen1}</Text>
                    <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.BITizen_desc1}</Text>
                    <Image source={{ uri: route.params.paramKey.BITizen2_img }} style={globalStyles.bitizenImage} />
                    <Text style={globalStyles.bitizenName}>{route.params.paramKey.weekly_BITizen2}</Text>
                    <Text style={globalStyles.bitNewsContent}>{route.params.paramKey.BITizen_desc2}</Text>
                    <Text style={globalStyles.bitNewsSubTitle}>Gratulálunk! :)</Text>
                </View>
            </View>
        </ScrollView>
    )
}