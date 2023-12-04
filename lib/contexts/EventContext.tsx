// EventsContext.tsx
import React from 'react';
import { EventType } from '../types/Event';

type EventsContextType = {
    events: EventType[] | null;
    setEvents: (events: EventType[]) => void;
    // You can add more functions here if needed
};

const EventsContext = React.createContext<EventsContextType>({
    events: null,
    setEvents: () => { }
});

export default EventsContext