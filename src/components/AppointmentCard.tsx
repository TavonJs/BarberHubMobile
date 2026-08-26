import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Appointment = {
  id: string;
  client: string;
  service: string;
  price: number;
  time: string;
  date: string;
  status: "Agendado" | "Concluido" | "Cancelado";
};

type Props = {
  item: Appointment;
  formatCurrency: (value: number) => string;
  onStatusChange: (
    id: string,
    status: "Agendado" | "Concluido" | "Cancelado",
  ) => void;
};

export default function AppointmentCard({
  item,
  formatCurrency,
  onStatusChange,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.client}>{item.client}</Text>

        <View
          style={[
            styles.badge,
            item.status === "Agendado" && styles.badgeAgendado,
            item.status === "Concluido" && styles.badgeConcluido,
            item.status === "Cancelado" && styles.badgeCancelado,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              item.status === "Agendado" && styles.textAgendado,
              item.status === "Concluido" && styles.textConcluido,
              item.status === "Cancelado" && styles.textCancelado,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detail}>
          <Text style={styles.label}>SERVIÇO</Text>
          <Text style={styles.value}>{item.service}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>HORÁRIO</Text>
          <Text style={styles.value}>{item.time}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>VALOR</Text>
          <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        </View>
      </View>

      {item.status === "Agendado" && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => onStatusChange(item.id, "Concluido")}
          >
            <Text style={styles.completeText}>Concluir</Text>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  client: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },

  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },

  badgeAgendado: {
    backgroundColor: "#332d18",
    borderColor: "#d4af37",
  },

  badgeConcluido: {
    backgroundColor: "#142d20",
    borderColor: "#2ecc71",
  },

  badgeCancelado: {
    backgroundColor: "#301918",
    borderColor: "#e74c3c",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
  },

  textAgendado: {
    color: "#d4af37",
  },

  textConcluido: {
    color: "#2ecc71",
  },

  textCancelado: {
    color: "#e74c3c",
  },

  details: {
    flexDirection: "row",
    backgroundColor: "#0a0a0a",
    padding: 10,
    borderRadius: 8,
  },

  detail: {
    flex: 1,
  },

  label: {
    color: "#666",
    fontSize: 9,
    marginBottom: 3,
  },

  value: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  price: {
    color: "#d4af37",
    fontSize: 12,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
  },

  completeButton: {
    flex: 1,
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginRight: 4,
  },

  completeText: {
    color: "#000",
    fontWeight: "700",
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginLeft: 4,
  },

  cancelText: {
    color: "#888",
    fontWeight: "700",
  },
});
