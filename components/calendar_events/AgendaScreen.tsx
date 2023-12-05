// AgendaScreen.tsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { supabase } from '../../lib/supabase';
import { EventType } from '../../lib/types/Event'; // Update the import path
import EventsContext from '../../lib/contexts/EventContext'; // If using context
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AgendaScreen = () => {
  const [items, setItems] = useState<{ [date: string]: Array<any> }>({});
  const { events, setEvents } = useContext(EventsContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const today = new Date().toISOString().split('T')[0];
    let { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date', today);

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data!);
    }
  };

  const loadItemsForMonth = (day: { dateString: string }) => {
    const newItems = filterEventsForMonth(day.dateString, events!);

    // Populate each day of the month in the items object
    const startOfMonth = new Date(day.dateString);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

    for (let date = startOfMonth; date <= endOfMonth; date.setDate(date.getDate() + 1)) {
        const dateStr = date.toISOString().split('T')[0];
        if (!newItems[dateStr]) {
            newItems[dateStr] = []; // Ensure each day has an entry, even if it's empty
        }
    }

    setItems(newItems);
  };

  const renderItem = (item: any) => {
    const flagColor = item.type === 'Közösségi' ? '#f69133' : '#12b0b0'
    return (
      <TouchableOpacity style={styles.eventCard}>
        <View style={{ width: 5, height: '100%', backgroundColor: flagColor, marginRight: 16 }}></View>
        <View style={{ flexDirection: 'column', flex: 3 / 5 }}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text>{item.place}</Text>
        </View>
        <Text style={{ flex: 1 / 3, fontFamily: 'EncodeSans_600SemiBold' }}>{item.date}</Text>
        <FontAwesomeIcon icon={faAngleRight} />
      </TouchableOpacity>
    )
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyEventCard}>
        <Text style={{fontFamily: 'EncodeSans_700Bold', color: '#505050', fontSize: 26}}>Nincs esemény!</Text>
        <Image source={require('../../assets/rofii1.gif')} style={{height: 200, width: 200}}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#12b0b0'}}>
      <Text style={styles.header}>Timeline</Text>
      <Agenda
        items={items}
        loadItemsForMonth={loadItemsForMonth}
        selected={getCurrentDate()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        showOnlySelectedDayItems={true}
        theme={{
          selectedDayBackgroundColor: '#12b0b0',
          dotColor: '#12b0b0',
          todayTextColor: '#12b0b0',
          agendaKnobColor: '#12b0b0',
          textMonthFontFamily: 'EncodeSans_700Bold',
          textMonthFontSize: 20,
          textDayFontFamily: 'EncodeSans_500Medium',
          agendaTodayColor: '#12b0b0',
          agendaDayTextColor: 'black',
          agendaDayNumColor: '#505050'
        }}
      />
    </SafeAreaView>

  );
};

const filterEventsForMonth = (month: string, events: EventType[]) => {
  const startOfMonth = new Date(month);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  const formattedItems: { [date: string]: Array<any> } = {};
  events.forEach(event => {
    const eventDate = new Date(event.date);
    if (eventDate >= startOfMonth && eventDate <= endOfMonth) {
      const dateStr = event.date;
      if (!formattedItems[dateStr]) {
        formattedItems[dateStr] = [];
      }
      formattedItems[dateStr].push(event);
    }
  });
  return formattedItems;
};

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  eventCard: {
    borderRadius: 9,
    flexDirection: 'row',
    marginTop: 8,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#12b0b0',
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 16
  },
  eventTitle: {
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 18,
    marginBottom: 4
  },
  header:{
    fontFamily: 'EncodeSans_700Bold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
    borderRadius: 25,
    color: 'white'
  },
  emptyEventCard: {
    height: '100%',
    flexDirection: 'column',
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: 'white',
    marginRight: 16
  }
});

export default AgendaScreen;
