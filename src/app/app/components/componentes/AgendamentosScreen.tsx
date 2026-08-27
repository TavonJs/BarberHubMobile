import { Text } from "react-native";

import { AppointmentCard } from "../components/AppointmentCard";
import { styles } from "../styles";
import { Appointment, AppointmentStatus } from "../types";

export function AgendamentosScreen({
  appointments,
  formatCurrency,
  onStatusChange,
}: {
  appointments: Appointment[];
  formatCurrency: (value: number) => string;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}) {
  return (
    <>
      <Text style={styles.pageHeading}>Agendamentos</Text>

      {appointments.map((item) => (
        <AppointmentCard
          key={item.id}
          item={item}
          formatCurrency={formatCurrency}
          onStatusChange={onStatusChange}
        />
      ))}
    </>
  );
}
