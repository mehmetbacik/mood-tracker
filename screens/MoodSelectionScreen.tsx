import { useEffect, useState } from "react";
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
import { COLORS } from "../constants/colors";
import { format } from "timeago.js";
import { isSameDay } from "date-fns";

const moodList = ["😊 Happy", "😢 Sad", "😠 Angry", "😌 Relaxed", "😴 Tired"];

export default function MoodSelectionScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { moodLogs, addMood, clearMoods, isLoading } = useMoodStorage();

  useEffect(() => {
    const todayLog = moodLogs.find((log) =>
      isSameDay(new Date(log.timestamp), new Date())
    );
    if (todayLog) {
      setSelectedMood(todayLog.mood);
    }
  }, [moodLogs]);

  const handleMoodSelect = async (mood: string) => {
    const added = await addMood(mood);
    if (added) {
      setSelectedMood(mood);
      Alert.alert("Mood Logged!", `You selected: ${mood}`);
    } else {
      Alert.alert("Already Logged", "You have already logged your mood today.");
    }
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

      <FlatList
        data={moodLogs}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Text style={styles.logItem}>
            {item.mood} — {format(item.timestamp)}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={styles.noLogs}>No moods logged yet.</Text>
        }
      />

      {moodLogs.length > 0 && (
        <View style={styles.clearButtonContainer}>
          <Button title="Clear All Logs" color="red" onPress={handleClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 10,
    color: COLORS.text,
  },
  logItem: {
    paddingVertical: 6,
    fontSize: 16,
    color: COLORS.text,
  },
  noLogs: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.muted,
    marginTop: 10,
  },
  clearButtonContainer: {
    marginTop: 20,
  },
});
