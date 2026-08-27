import { Text, View } from "react-native";

import { AppointmentCard } from "../components/AppointmentCard";
import { EmptyMessage } from "../components/EmptyMessage";
import { styles } from "../styles";
import { Appointment, AppointmentStatus } from "../types";

export function DashboardScreen({
  totalRevenue,
  totalAppointments,
  acceptedAppointments,
  formatCurrency,
  onStatusChange,
}: {
  totalRevenue: number;
  totalAppointments: number;
  acceptedAppointments: Appointment[];
  formatCurrency: (value: number) => string;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
}) {
  return (
    <>
      <Text style={styles.greetingTitle}>Olá, Anderson!</Text>

      <Text style={styles.greetingSub}>Seu estilo, nossa arte</Text>

      <View style={styles.heroBanner}>
        <Text style={styles.heroLabel}>FATURAMENTO TOTAL</Text>

        <Text style={styles.heroValue}>{formatCurrency(totalRevenue)}</Text>
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>AGENDAMENTOS</Text>

          <Text style={styles.metricValue}>{totalAppointments}</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>AGENDADOS</Text>

          <Text style={styles.metricValue}>
            {acceptedAppointments.length}
          </Text>
        </View>
      </View>

      {/* PRÓXIMOS ATENDIMENTOS */}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Próximos atendimentos</Text>
      </View>

      {acceptedAppointments.length === 0 ? (
        <EmptyMessage text="Nenhum atendimento agendado." />
      ) : (
        acceptedAppointments.map((item) => (
          <AppointmentCard
            key={item.id}
            item={item}
            formatCurrency={formatCurrency}
            onStatusChange={onStatusChange}
          />
        ))
      )}
    </>
  );
}
