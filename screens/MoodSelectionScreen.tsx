import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import MoodOption from "../components/MoodOption";
import { useMoodStorage } from "../hooks/useMoodStorage";

const moodList = ["😊 Happy", "😢 Sad", "😠 Angry", "😌 Relaxed", "😴 Tired"];

export default function MoodSelectionScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { moodLogs, addMood, clearMoods, isLoading } = useMoodStorage();

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    addMood(mood);
    Alert.alert("Mood Logged!", `You selected: ${mood}`);
  };

  const handleClear = () => {
    Alert.alert(
      "Clear Mood Logs",
      "Are you sure you want to delete all mood history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: () => clearMoods(),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading your mood logs...</Text>
      </View>
    );
  }

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

      {moodLogs.length > 0 ? (
        <>
          <FlatList
            data={moodLogs}
            keyExtractor={(item) => item.timestamp.toString()}
            renderItem={({ item }) => (
              <Text style={styles.logItem}>
                {item.mood} - {new Date(item.timestamp).toLocaleString()}
              </Text>
            )}
          />
          <Button title="Clear All Logs" color="red" onPress={handleClear} />
        </>
      ) : (
        <Text style={styles.noLogs}>No moods logged yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  noLogs: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#999",
    marginTop: 10,
  },
});
