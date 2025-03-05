import { useState, useEffect } from 'react';
import { timetableApi } from '../services/api';

export const useTimetable = (view = 'daily') => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const response = view === 'daily' 
          ? await timetableApi.getDaily()
          : await timetableApi.getWeekly();
        setTimetable(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching timetable:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [view]);

  return { timetable, loading, error };
}; 