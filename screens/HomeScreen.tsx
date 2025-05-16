import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMoodStorage } from "../hooks/useMoodStorage";

export default function HomeScreen() {
  const { getTodayMood, isLoading } = useMoodStorage();
  const todayMood = getTodayMood();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Mood</Text>
      {todayMood ? (
        <Text style={styles.mood}>{todayMood.mood}</Text>
      ) : (
        <Text style={styles.noMood}>No mood logged for today yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  mood: {
    fontSize: 28,
    marginTop: 10,
    color: "#4caf50",
  },
  noMood: {
    fontSize: 18,
    marginTop: 10,
    color: "#999",
  },
});
