import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type AppointmentStatus = "Solicitado" | "Agendado" | "Concluido" | "Cancelado";

type Appointment = {
  id: string;
  client: string;
  service: string;
  price: number;
  time: string;
  date: string;
  status: AppointmentStatus;
};

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
   * AGENDAMENTOS
   *
   * O cliente cria a solicitação.
   * O barbeiro NÃO cria agendamentos.
   */
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      client: "Schnaider",
      service: "Corte de Cabelo",
      price: 40,
      time: "09:30",
      date: "24 MAI",
      status: "Concluido",
    },
    {
      id: "2",
      client: "Arthur",
      service: "Barba",
      price: 30,
      time: "10:30",
      date: "24 MAI",
      status: "Concluido",
    },
    {
      id: "3",
      client: "Anderson bolkonsky",
      service: "Corte + Barba",
      price: 59.9,
      time: "14:00",
      date: "25 MAI",
      status: "Cancelado",
    },
    {
      id: "4",
      client: "Andrei Zakharov",
      service: "Sobrancelha",
      price: 20,
      time: "15:30",
      date: "25 MAI",
      status: "Solicitado",
    },
  ]);

  const services = [
    {
      id: "1",
      name: "Corte de Cabelo",
      price: 40,
      icon: "✂️",
    },
    {
      id: "2",
      name: "Barba",
      price: 30,
      icon: "🧔",
    },
    {
      id: "3",
      name: "Corte + Barba",
      price: 59.9,
      icon: "✂️🧔",
    },
    {
      id: "4",
      name: "Sobrancelha",
      price: 20,
      icon: "✏️",
    },
    {
      id: "5",
      name: "Hidratação",
      price: 50,
      icon: "💧",
    },
    {
      id: "6",
      name: "Pezinho",
      price: 20,
      icon: "📐",
    },
  ];

  const hours = [
    {
      day: "Segunda-feira",
      time: "08:00 às 18:00",
    },
    {
      day: "Terça-feira",
      time: "08:00 às 18:00",
    },
    {
      day: "Quarta-feira",
      time: "08:00 às 18:00",
    },
    {
      day: "Quinta-feira",
      time: "08:00 às 18:00",
    },
    {
      day: "Sexta-feira",
      time: "08:00 às 19:00",
    },
    {
      day: "Sábado",
      time: "08:00 às 14:00",
    },
    {
      day: "Domingo",
      time: "Fechado",
    },
  ];

  /*
   * ALTERAÇÃO DO STATUS
   */
  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item,
      ),
    );

    if (status === "Agendado") {
      Alert.alert(
        "Agendamento aceito",
        "O cliente foi aceito e o horário foi reservado.",
      );
    }

    if (status === "Cancelado") {
      Alert.alert("Agendamento cancelado", "O agendamento foi cancelado.");
    }

    if (status === "Concluido") {
      Alert.alert(
        "Atendimento concluído",
        "O atendimento foi marcado como concluído.",
      );
    }
  };

  /*
   * SOMENTE ATENDIMENTOS CONCLUÍDOS
   */
  const completedServices = appointments.filter(
    (item) => item.status === "Concluido",
  );

  /*
   * FATURAMENTO
   */
  const totalRevenue = completedServices.reduce(
    (total, item) => total + item.price,
    0,
  );

  /*
   * SOLICITAÇÕES PENDENTES
   */
  const pendingAppointments = appointments.filter(
    (item) => item.status === "Solicitado",
  );

  /*
   * AGENDAMENTOS ACEITOS
   */
  const acceptedAppointments = appointments.filter(
    (item) => item.status === "Agendado",
  );

  /*
   * FORMATA MOEDA
   */
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  /*
   * NAVEGAÇÃO
   */
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* =========================
            MENU LATERAL
        ========================= */}

        {isMenuOpen && (
          <View style={styles.drawerWrapper}>
            <TouchableOpacity
              style={styles.drawerBackground}
              activeOpacity={1}
              onPress={() => setIsMenuOpen(false)}
            />

            <View style={styles.drawer}>
              <View style={styles.drawerHeader}>
                <View style={styles.brandBadge}>
                  <Text style={styles.brandIcon}>✂️</Text>
                </View>

                <View>
                  <Text style={styles.drawerTitle}>BARBERHUB</Text>

                  <Text style={styles.drawerSubtitle}>Painel do Barbeiro</Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsMenuOpen(false)}
                >
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.drawerNav}>
                <MenuButton
                  icon="📊"
                  title="Dashboard"
                  active={activeTab === "dashboard"}
                  onPress={() => navigateTo("dashboard")}
                />

                <MenuButton
                  icon="👤"
                  title="Clientes"
                  active={activeTab === "clientes"}
                  onPress={() => navigateTo("clientes")}
                />

                <MenuButton
                  icon="✂️"
                  title="Serviços"
                  active={activeTab === "servicos"}
                  onPress={() => navigateTo("servicos")}
                />

                <MenuButton
                  icon="📅"
                  title="Agendamentos"
                  active={activeTab === "agendamentos"}
                  onPress={() => navigateTo("agendamentos")}
                />

                <MenuButton
                  icon="🕒"
                  title="Horários"
                  active={activeTab === "horarios"}
                  onPress={() => navigateTo("horarios")}
                />

                <MenuButton
                  icon="⚙️"
                  title="Configurações"
                  active={activeTab === "configuracoes"}
                  onPress={() => navigateTo("configuracoes")}
                />

                <MenuButton
                  icon="👤"
                  title="Perfil"
                  active={activeTab === "perfil"}
                  onPress={() => navigateTo("perfil")}
                />
              </View>
            </View>
          </View>
        )}

        {/* =========================
            TOPO
        ========================= */}

        <View style={styles.topBar}>
          <Text style={styles.brandTitle}>BARBERHUB</Text>

          <TouchableOpacity
            style={styles.menuTrigger}
            onPress={() => setIsMenuOpen(true)}
          >
            <Text style={styles.menuText}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* =========================
            CONTEÚDO
        ========================= */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              DASHBOARD
          ========================= */}

          {activeTab === "dashboard" && (
            <>
              <Text style={styles.greetingTitle}>Olá, Anderson!</Text>

              <Text style={styles.greetingSub}>Seu estilo, nossa arte</Text>

              <View style={styles.heroBanner}>
                <Text style={styles.heroLabel}>FATURAMENTO TOTAL</Text>

                <Text style={styles.heroValue}>
                  {formatCurrency(totalRevenue)}
                </Text>
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>SOLICITAÇÕES</Text>

                  <Text style={styles.metricValue}>
                    {pendingAppointments.length}
                  </Text>
                </View>

                <View style={styles.metricBox}>
                  <Text style={styles.metricLabel}>AGENDADOS</Text>

                  <Text style={styles.metricValue}>
                    {acceptedAppointments.length}
                  </Text>
                </View>
              </View>

              {/* SOLICITAÇÕES DOS CLIENTES */}

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Solicitações</Text>
              </View>

              {pendingAppointments.length === 0 ? (
                <EmptyMessage text="Nenhuma solicitação pendente." />
              ) : (
                pendingAppointments.map((item) => (
                  <AppointmentCard
                    key={item.id}
                    item={item}
                    formatCurrency={formatCurrency}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}

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
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </>
          )}

          {/* =========================
              CLIENTES
          ========================= */}

          {activeTab === "clientes" && (
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
          )}

          {/* =========================
              SERVIÇOS
          ========================= */}

          {activeTab === "servicos" && (
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
          )}

          {/* =========================
              AGENDAMENTOS
          ========================= */}

          {activeTab === "agendamentos" && (
            <>
              <Text style={styles.pageHeading}>Agendamentos</Text>

              <View style={styles.infoBox}>
                <Text style={styles.infoIcon}>ℹ️</Text>

                <Text style={styles.infoText}>
                  Os clientes fazem os pedidos de agendamento. Aqui você pode
                  aceitar ou cancelar as solicitações.
                </Text>
              </View>

              {appointments.map((item) => (
                <AppointmentCard
                  key={item.id}
                  item={item}
                  formatCurrency={formatCurrency}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </>
          )}

          {/* =========================
              HORÁRIOS
          ========================= */}

          {activeTab === "horarios" && (
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
          )}

          {/* =========================
              CONFIGURAÇÕES
          ========================= */}

          {activeTab === "configuracoes" && (
            <>
              <Text style={styles.pageHeading}>Configurações</Text>

              <View style={styles.cardList}>
                <ConfigCard label="NOME DA BARBEARIA" value="BARBERHUB" />

                <ConfigCard label="RESPONSÁVEL" value="Anderson Tavares" />

                <ConfigCard label="TELEFONE" value="(81) 99999-9999" />

                <ConfigCard
                  label="HORÁRIO"
                  value="Segunda a Sexta - 08:00 às 18:00"
                />
              </View>
            </>
          )}

          {/* =========================
              PERFIL
          ========================= */}

          {activeTab === "perfil" && (
            <View style={styles.profileContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>💈</Text>
              </View>

              <Text style={styles.profileName}>Anderson Tavares</Text>

              <Text style={styles.profileSub}>Barbeiro & Administrador</Text>

              <View style={styles.fullWidth}>
                <ConfigCard label="NOME" value="Anderson Tavares" />

                <ConfigCard label="RESPONSÁVEL" value="Anderson Tavares" />

                <ConfigCard label="EMAIL" value="anderson@barberhub.com" />

                <ConfigCard label="TELEFONE" value="(81) 99999-9999" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* =========================
            BOTTOM NAV
        ========================= */}

        <View style={styles.bottomNav}>
          <NavButton
            icon="🏠"
            label="Início"
            active={activeTab === "dashboard"}
            onPress={() => setActiveTab("dashboard")}
          />

          <NavButton
            icon="📅"
            label="Agendamentos"
            active={activeTab === "agendamentos"}
            onPress={() => setActiveTab("agendamentos")}
          />

          <NavButton
            icon="✂️"
            label="Serviços"
            active={activeTab === "servicos"}
            onPress={() => setActiveTab("servicos")}
          />

          <NavButton
            icon="👤"
            label="Perfil"
            active={activeTab === "perfil"}
            onPress={() => setActiveTab("perfil")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =====================================================
   CARD DE AGENDAMENTO
===================================================== */

function AppointmentCard({
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
          <Text style={styles.clientName}>{item.client}</Text>

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

      {/* SOLICITAÇÃO DO CLIENTE */}

      {item.status === "Solicitado" && (
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => onStatusChange(item.id, "Agendado")}
          >
            <Text style={styles.acceptText}>✓ Aceitar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onStatusChange(item.id, "Cancelado")}
          >
            <Text style={styles.cancelText}>✕ Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

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

/* =====================================================
   STATUS
===================================================== */

function StatusBadge({ status }: { status: AppointmentStatus }) {
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

  if (status === "Solicitado") {
    background = "#29210c";
    color = "#f1c40f";
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

/* =====================================================
   CONFIG CARD
===================================================== */

function ConfigCard({ label, value }: { label: string; value: string }) {
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

/* =====================================================
   MENU BUTTON
===================================================== */

function MenuButton({
  icon,
  title,
  active,
  onPress,
}: {
  icon: string;
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.menuButton, active && styles.menuButtonActive]}
      onPress={onPress}
    >
      <Text style={styles.menuIcon}>{icon}</Text>

      <Text
        style={[styles.menuButtonText, active && styles.menuButtonTextActive]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* =====================================================
   NAV BUTTON
===================================================== */

function NavButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      <Text style={styles.navIcon}>{icon}</Text>

      <Text style={[styles.navLabel, active && styles.navLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* =====================================================
   MENSAGEM VAZIA
===================================================== */

function EmptyMessage({ text }: { text: string }) {
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyIcon}>📅</Text>

      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

/* =====================================================
   ESTILOS
===================================================== */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  /* TOPO */

  topBar: {
    height: 64,
    backgroundColor: "#0d0d0d",
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brandTitle: {
    color: "#d4af37",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 2,
  },

  menuTrigger: {
    width: 42,
    height: 40,
    backgroundColor: "#181818",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  menuText: {
    color: "#fff",
    fontSize: 21,
  },

  /* SCROLL */

  scroll: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 100,
  },

  /* DASHBOARD */

  greetingTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  greetingSub: {
    color: "#777",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 18,
  },

  heroBanner: {
    backgroundColor: "#15130e",
    borderWidth: 1,
    borderColor: "#d4af37",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },

  heroLabel: {
    color: "#aaa",
    fontSize: 11,
    letterSpacing: 1,
  },

  heroValue: {
    color: "#d4af37",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 5,
  },

  metricsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  metricBox: {
    flex: 1,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 10,
    padding: 14,
  },

  metricLabel: {
    color: "#777",
    fontSize: 9,
    fontWeight: "700",
  },

  metricValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  /* SEÇÕES */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  pageHeading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  /* CARDS */

  appointmentCard: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 15,
    marginBottom: 11,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  clientName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  dateText: {
    color: "#666",
    fontSize: 10,
    marginTop: 3,
  },

  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  cardDetails: {
    backgroundColor: "#0a0a0a",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
  },

  detailColumn: {
    flex: 1,
    minWidth: 0,
  },

  detailLabel: {
    color: "#666",
    fontSize: 8,
  },

  detailValue: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },

  goldText: {
    color: "#d4af37",
    fontSize: 12,
    fontWeight: "600",
  },

  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: "center",
  },

  acceptText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },

  completeButton: {
    flex: 1,
    backgroundColor: "#2ecc71",
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: "center",
  },

  completeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 11,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 7,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },

  cancelText: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 11,
  },

  /* INFO */

  infoBox: {
    backgroundColor: "#15130e",
    borderWidth: 1,
    borderColor: "#3a3218",
    borderRadius: 10,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    color: "#aaa",
    fontSize: 12,
    lineHeight: 18,
  },

  /* LISTAS */

  cardList: {
    gap: 1,
  },

  simpleCard: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 10,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 64,
    marginBottom: 10,
  },

  cardSub: {
    color: "#666",
    fontSize: 9,
    letterSpacing: 0.5,
  },

  cardMainText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 3,
    fontWeight: "600",
  },

  serviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    backgroundColor: "#222",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  timePill: {
    color: "#aaa",
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 11,
  },

  arrow: {
    color: "#555",
    fontSize: 25,
  },

  /* EMPTY */

  emptyBox: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    marginBottom: 18,
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 8,
  },

  emptyText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },

  /* PERFIL */

  profileContainer: {
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "#d4af37",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 40,
  },

  profileName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  profileSub: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 15,
  },

  fullWidth: {
    width: "100%",
  },

  /* BOTTOM NAV */

  bottomNav: {
    height: 68,
    backgroundColor: "#0d0d0d",
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 3,
  },

  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  navIcon: {
    fontSize: 19,
  },

  navLabel: {
    color: "#555",
    fontSize: 9,
  },

  navLabelActive: {
    color: "#d4af37",
  },

  /* MENU LATERAL */

  drawerWrapper: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
  },

  drawerBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },

  drawer: {
    width: 285,
    height: "100%",
    backgroundColor: "#111",
    padding: 18,
  },

  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  brandBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  brandIcon: {
    fontSize: 20,
  },

  drawerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  drawerSubtitle: {
    color: "#666",
    fontSize: 10,
    marginTop: 2,
  },

  closeButton: {
    marginLeft: "auto",
    padding: 5,
  },

  closeText: {
    color: "#888",
    fontSize: 20,
  },

  drawerNav: {
    marginTop: 20,
    gap: 6,
  },

  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderRadius: 8,
  },

  menuButtonActive: {
    backgroundColor: "#1c1a14",
  },

  menuIcon: {
    width: 30,
    fontSize: 18,
  },

  menuButtonText: {
    color: "#aaa",
    fontSize: 14,
  },

  menuButtonTextActive: {
    color: "#d4af37",
  },
});
