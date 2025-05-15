import { Pressable, Text, StyleSheet } from 'react-native';

type MoodOptionProps = {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
};

export default function MoodOption({ label, onSelect, isSelected }: MoodOptionProps) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.option, isSelected && styles.selected]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 6,
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  text: {
    fontSize: 16,
  },
});
