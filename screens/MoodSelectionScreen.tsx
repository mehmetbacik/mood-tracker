import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MoodOption from '../components/MoodOption';

const moodList = ['😊 Happy', '😢 Sad', '😠 Angry', '😌 Relaxed', '😴 Tired'];

export default function MoodSelectionScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      {moodList.map((mood) => (
        <MoodOption
          key={mood}
          label={mood}
          onSelect={() => setSelectedMood(mood)}
          isSelected={selectedMood === mood}
        />
      ))}
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
    fontWeight: '600',
    marginBottom: 20,
  },
});
