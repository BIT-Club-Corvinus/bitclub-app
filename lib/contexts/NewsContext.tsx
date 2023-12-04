// NewsContext.tsx
import React from 'react';
import { News } from '../types/News';

type NewsContextType = {
    news: News[] | null;
    setNews: (events: News[]) => void;
    // You can add more functions here if needed
};

const NewsContext = React.createContext<NewsContextType>({
    news: null,
    setNews: () => { }
});

export default NewsContext