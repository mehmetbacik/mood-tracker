import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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
        console.error("Error loading moods", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoods();
  }, []);

  const addMood = async (mood: string) => {
    const newLog = { mood, timestamp: Date.now() };
    const updated = [newLog, ...moodLogs];
    setMoodLogs(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving mood", err);
    }
  };

  const clearMoods = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setMoodLogs([]);
    } catch (err) {
      console.error("Error clearing moods", err);
    }
  };

  return {
    moodLogs,
    addMood,
    clearMoods,
    isLoading,
  };
}
