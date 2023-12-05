import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import EventsContext from '../../lib/contexts/EventContext';
import { supabase } from '../../lib/supabase';
import { EventType } from '../../lib/types/Event';
import { Agenda } from 'react-native-calendars';
import ProfileContext from '../../lib/contexts/ProfileContext';

const AgendaScreen = () => {
  const [items, setItems] = useState<{ [date: string]: any }>({});
  const { events, setEvents } = useContext(EventsContext);
  const { session } = useContext(ProfileContext)

  useEffect(() => {
    fetchEvents();
  }, [session]);

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
      console.log(events)
    }
  };

  const loadItemsForMonth = (day: { dateString: string }) => {
    const newItems = filterEventsForMonth(day.dateString, events);
    setItems(newItems);
  };

  const renderItem = (item: any) => {
    return (
      <View>
        <Text>{item.date}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Agenda
        items={items}
        loadItemsForMonth={loadItemsForMonth}
        selected={getCurrentDate()}
        renderItem={renderItem}
      />
    </SafeAreaView>

  );
}

const filterEventsForMonth = (month: string, events: any[] | null) => {
  const startOfMonth = new Date(month);
  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);

  const formattedItems: { [date: string]: Array<EventType> } = {};
  events?.forEach(event => {
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
  }
});

export default AgendaScreen