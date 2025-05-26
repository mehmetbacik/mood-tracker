import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useMoodStorage } from "../hooks/useMoodStorage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
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
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-text">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-text mb-6">Today's Mood</Text>
        {todayMood ? (
          <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <Text className="text-3xl text-secondary font-medium text-center">{todayMood}</Text>
          </View>
        ) : (
          <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <Text className="text-lg text-gray-500 italic text-center">No mood logged for today yet.</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("MoodSelection")}
          className="bg-primary rounded-lg py-4 px-6 shadow-sm"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {todayMood ? "Update Today's Mood" : "Log Today's Mood"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
