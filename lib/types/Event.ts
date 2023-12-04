// Event.ts
export type EventType = {
    id: number;
    title: string;
    date: string; // date in 'YYYY-MM-DD' format
    start_time: string; // datetime with timezone
    end_time: string; // datetime with timezone
    type: string;
    place: string;
    description: string;
    date_is_tba: boolean;
};
