import { Text, View } from "react-native";

import { StatusBadge } from "../components/StatusBadge";
import { styles } from "../styles";
import { Appointment } from "../types";

export function ClientesScreen({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <>
      <Text style={styles.pageHeading}>Clientes</Text>

      <View style={styles.cardList}>
        {appointments.map((item) => (
          <View key={item.id} style={styles.simpleCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardSub}>CLIENTE</Text>

              <Text style={styles.cardMainText}>{item.client}</Text>
            </View>

            <StatusBadge status={item.status} />
          </View>
        ))}
      </View>
    </>
  );
}
