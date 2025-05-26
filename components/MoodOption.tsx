import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface MoodOptionProps {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
}

export default function MoodOption({
  label,
  onSelect,
  isSelected,
}: MoodOptionProps) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      className={`p-4 rounded-xl ${
        isSelected ? "bg-primary" : "bg-secondary"
      }`}
    >
      <Text
        className={`text-center text-lg ${
          isSelected ? "text-white font-bold" : "text-text"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
