import { Text, View } from "react-native";

import { styles } from "../styles";

export function EmptyMessage({ text }: { text: string }) {
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>📅</Text>

      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}
