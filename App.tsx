import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import MoodSelectionScreen from './screens/MoodSelectionScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
      <MoodSelectionScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
