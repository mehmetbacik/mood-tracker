import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import MoodOption from "../components/MoodOption";

const moodList = ["😊 Happy", "😢 Sad", "😠 Angry", "😌 Relaxed", "😴 Tired"];

type MoodLog = {
  mood: string;
  timestamp: number;
};

export default function MoodSelectionScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);

    const newLog: MoodLog = {
      mood,
      timestamp: Date.now(),
    };

    setMoodLogs((prev) => [newLog, ...prev]);

    Alert.alert("Mood Logged!", `You selected: ${mood}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      {moodList.map((mood) => (
        <MoodOption
          key={mood}
          label={mood}
          onSelect={() => handleMoodSelect(mood)}
          isSelected={selectedMood === mood}
        />
      ))}

      <Text style={styles.subtitle}>Mood Log</Text>
      <FlatList
        data={moodLogs}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Text style={styles.logItem}>
            {item.mood} - {new Date(item.timestamp).toLocaleString()}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 30,
    marginBottom: 10,
  },
  logItem: {
    paddingVertical: 4,
    fontSize: 16,
  },
});
