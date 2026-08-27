import { Text, View } from "react-native";

import { services } from "../data";
import { styles } from "../styles";

export function ServicosScreen({
  formatCurrency,
}: {
  formatCurrency: (value: number) => string;
}) {
  return (
    <>
      <Text style={styles.pageHeading}>Serviços</Text>

      <View style={styles.cardList}>
        {services.map((service) => (
          <View key={service.id} style={styles.simpleCard}>
            <View style={styles.serviceLeft}>
              <View style={styles.iconBox}>
                <Text>{service.icon}</Text>
              </View>

              <Text style={styles.cardMainText}>{service.name}</Text>
            </View>

            <Text style={styles.goldText}>
              {formatCurrency(service.price)}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}
