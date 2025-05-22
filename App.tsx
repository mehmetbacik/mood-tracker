import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import MoodSelectionScreen from "./screens/MoodSelectionScreen";

export default function App() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {selectedMood ? (
        <HomeScreen selectedMood={selectedMood} />
      ) : (
        <MoodSelectionScreen onSelectMood={setSelectedMood} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
