import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";

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
      style={[styles.option, isSelected && styles.selectedOption]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: "center",
  },
  selectedText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
