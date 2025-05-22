import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { isSameDay } from "date-fns";

export type MoodLog = {
  mood: string;
  timestamp: number;
};

const STORAGE_KEY = "MOOD_LOGS";

export function useMoodStorage() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMoods = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setMoodLogs(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Error loading moods:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoods();
  }, []);

  const addMood = async (mood: string) => {
    const today = new Date();
    const alreadyLoggedToday =
      moodLogs.length > 0 && isSameDay(new Date(moodLogs[0].timestamp), today);

    if (alreadyLoggedToday) return false;

    const newLog = { mood, timestamp: Date.now() };
    const updated = [newLog, ...moodLogs];
    setMoodLogs(updated);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving mood:", err);
    }

    return true;
  };

  const clearMoods = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setMoodLogs([]);
    } catch (err) {
      console.error("Error clearing moods:", err);
    }
  };

  const getTodayMood = (): MoodLog | null => {
    const todayLog = moodLogs.find((log) =>
      isSameDay(new Date(log.timestamp), new Date())
    );
    return todayLog || null;
  };

  return {
    moodLogs,
    addMood,
    clearMoods,
    isLoading,
    getTodayMood,
  };
}
