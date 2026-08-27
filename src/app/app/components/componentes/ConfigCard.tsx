import { Text, View } from "react-native";

import { styles } from "../styles";

export function ConfigCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.simpleCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardSub}>{label}</Text>

        <Text style={styles.cardMainText}>{value}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </View>
  );
}
