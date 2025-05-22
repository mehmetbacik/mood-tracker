import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMoodStorage } from "../hooks/useMoodStorage";

interface HomeScreenProps {
  selectedMood: string | null;
  onSelectMood: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function HomeScreen({ selectedMood, onSelectMood }: HomeScreenProps) {
  const { getTodayMood, isLoading } = useMoodStorage();
  const [todayMood, setTodayMood] = useState<string | null>(null);

  useEffect(() => {
    const mood = getTodayMood();
    if (mood) {
      setTodayMood(mood.mood);
    } else {
      setTodayMood(null);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Mood</Text>
      {todayMood ? (
        <Text style={styles.mood}>{todayMood}</Text>
      ) : (
        <Text style={styles.noMood}>No mood logged for today yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  mood: {
    fontSize: 32,
    color: "#388e3c",
    fontWeight: "500",
  },
  noMood: {
    fontSize: 18,
    color: "#777",
    fontStyle: "italic",
  },
});
