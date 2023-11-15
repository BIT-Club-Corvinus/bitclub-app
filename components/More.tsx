import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileContext from '../lib/ProfileContext';

const More = () => {
const { profile } = useContext(ProfileContext)

  const moreOptions = [
    { key: 'profile', label: 'Profile', highlighted: true },
    { key: 'settings', label: 'Settings', highlighted: false },
    { key: 'boardGames', label: 'Board Games', highlighted: false },
    { key: 'anotherOption', label: 'Another Option', highlighted: false },
  ];

  const renderItem = ({ item }: {item: any}) => {
    return (
      <TouchableOpacity style={item.highlighted ? styles.highlightedItem : styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={moreOptions}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  highlightedItem: {
    backgroundColor: '#fff', // Same color as other items
    padding: 20,
    marginBottom: 30, // Extra padding at the bottom
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
  },
})
export default More