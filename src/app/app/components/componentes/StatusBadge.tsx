import { Text, View } from "react-native";

import { styles } from "../styles";
import { AppointmentStatus } from "../types";

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  let background = "#2b2410";
  let color = "#d4af37";

  if (status === "Concluido") {
    background = "#102b1d";
    color = "#2ecc71";
  }

  if (status === "Cancelado") {
    background = "#2b1111";
    color = "#e74c3c";
  }

  if (status === "Agendado") {
    background = "#102b1d";
    color = "#2ecc71";
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: background,
          borderColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          {
            color,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}
