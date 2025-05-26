import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MoodOption from "../components/MoodOption";
import { useMoodStorage } from "../hooks/useMoodStorage";
import { format } from "timeago.js";
import { isSameDay } from "date-fns";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

const moodList = ["😊 Happy", "😢 Sad", "😠 Angry", "😌 Relaxed", "😴 Tired"];

type MoodSelectionScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MoodSelection">;
};

export default function MoodSelectionScreen({ navigation }: MoodSelectionScreenProps) {
  const { moodLogs, addMood, clearMoods, isLoading } = useMoodStorage();

  const handleMoodSelect = async (mood: string) => {
    const added = await addMood(mood);
    if (added) {
      Alert.alert("Mood Logged!", `You selected: ${mood}`);
      navigation.goBack();
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
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-4 text-lg text-text">Loading your mood logs...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-text mb-6">How are you feeling today?</Text>

        <View className="space-y-4 mb-8">
          {moodList.map((mood) => (
            <MoodOption
              key={mood}
              label={mood}
              onSelect={() => handleMoodSelect(mood)}
              isSelected={false}
            />
          ))}
        </View>

        <Text className="text-xl font-semibold text-text mb-4">Mood Log</Text>

        <FlatList
          data={moodLogs}
          keyExtractor={(item) => item.timestamp.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-2 shadow-sm">
              <Text className="text-lg text-text">
                {item.mood} — {format(item.timestamp)}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-lg text-gray-500 italic text-center py-4">
              No moods logged yet.
            </Text>
          }
        />

        {moodLogs.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="mt-6 bg-red-500 rounded-lg py-4 px-6"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Clear All Logs
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
