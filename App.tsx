import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
