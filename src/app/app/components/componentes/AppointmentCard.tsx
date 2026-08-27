import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "../styles";
import { Appointment, AppointmentStatus } from "../types";
import { StatusBadge } from "./StatusBadge";

export function AppointmentCard({
  item,
  formatCurrency,
  onStatusChange,
}: {
  item: Appointment;
  formatCurrency: (value: number) => string;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}) {
  return (
    <View style={styles.appointmentCard}>
      <View style={styles.cardTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.clientName}>
            <Text style={styles.numberTag}>#{item.numero} </Text>
            {item.client}
          </Text>

          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <StatusBadge status={item.status} />
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>SERVIÇO</Text>

          <Text style={styles.detailValue}>{item.service}</Text>
        </View>

        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>HORÁRIO</Text>

          <Text style={styles.detailValue}>{item.time}</Text>
        </View>

        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>VALOR</Text>

          <Text style={styles.goldText}>{formatCurrency(item.price)}</Text>
        </View>
      </View>

      {/* ATENDIMENTO ACEITO */}

      {item.status === "Agendado" && (
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onStatusChange(item.id, "Concluido")}
          >
            <Text style={styles.completeText}>✓ Concluir atendimento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onStatusChange(item.id, "Cancelado")}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
