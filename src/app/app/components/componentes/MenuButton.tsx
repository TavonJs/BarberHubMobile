import { Text, TouchableOpacity } from "react-native";

import { styles } from "../styles";

export function MenuButton({
  icon,
  title,
  active,
  onPress,
}: {
  icon: string;
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.menuButton, active && styles.menuButtonActive]}
      onPress={onPress}
    >
      <Text style={styles.menuIcon}>{icon}</Text>

      <Text
        style={[styles.menuButtonText, active && styles.menuButtonTextActive]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
