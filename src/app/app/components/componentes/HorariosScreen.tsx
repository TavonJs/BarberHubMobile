import { Text, View } from "react-native";

import { hours } from "../data";
import { styles } from "../styles";

export function HorariosScreen() {
  return (
    <>
      <Text style={styles.pageHeading}>Horários</Text>

      <View style={styles.cardList}>
        {hours.map((hour, index) => (
          <View key={index} style={styles.simpleCard}>
            <Text style={styles.cardMainText}>{hour.day}</Text>

            <Text style={styles.timePill}>{hour.time}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
