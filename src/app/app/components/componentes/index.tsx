import { useState } from "react";
import { SafeAreaView, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { NavButton } from "./components/NavButton";
import { SideMenu } from "./components/SideMenu";
import { AgendamentosScreen } from "./screens/AgendamentosScreen";
import { ClientesScreen } from "./screens/ClientesScreen";
import { ConfiguracoesScreen } from "./screens/ConfiguracoesScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { HorariosScreen } from "./screens/HorariosScreen";
import { PerfilScreen } from "./screens/PerfilScreen";
import { ServicosScreen } from "./screens/ServicosScreen";
import { styles } from "./styles";
import { Appointment, AppointmentStatus } from "./types";

export default function Index() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*
   * AGENDAMENTOS
   *
   * O cliente cria a solicitação.
   * O barbeiro NÃO cria agendamentos.
   *
   * "numero" e a numeração sequencial do agendamento,
   * do mais antigo (1) para o mais novo, para o barbeiro
   * saber a ordem em que os agendamentos foram feitos.
   */
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      numero: 1,
      client: "Schnaider",
      service: "Corte de Cabelo",
      price: 40,
      time: "09:30",
      date: "24 MAI",
      status: "Concluido",
    },
    {
      id: "2",
      numero: 2,
      client: "Arthur",
      service: "Barba",
      price: 30,
      time: "10:30",
      date: "24 MAI",
      status: "Concluido",
    },
    {
      id: "3",
      numero: 3,
      client: "BRUNO",
      service: "Corte + Barba",
      price: 59.9,
      time: "14:00",
      date: "25 MAI",
      status: "Cancelado",
    },
    {
      id: "4",
      numero: 4,
      client: "Andrei Zakharov",
      service: "Sobrancelha",
      price: 20,
      time: "15:30",
      date: "25 MAI",
      status: "Agendado",
    },
  ]);

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
   * QUANTIDADE TOTAL DE AGENDAMENTOS
   */
  const totalAppointments = appointments.length;

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
        {isMenuOpen && (
          <SideMenu
            activeTab={activeTab}
            onNavigate={navigateTo}
            onClose={() => setIsMenuOpen(false)}
          />
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
          {activeTab === "dashboard" && (
            <DashboardScreen
              totalRevenue={totalRevenue}
              totalAppointments={totalAppointments}
              acceptedAppointments={acceptedAppointments}
              formatCurrency={formatCurrency}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === "clientes" && (
            <ClientesScreen appointments={appointments} />
          )}

          {activeTab === "servicos" && (
            <ServicosScreen formatCurrency={formatCurrency} />
          )}

          {activeTab === "agendamentos" && (
            <AgendamentosScreen
              appointments={appointments}
              formatCurrency={formatCurrency}
              onStatusChange={handleStatusChange}
            />
          )}

          {activeTab === "horarios" && <HorariosScreen />}

          {activeTab === "configuracoes" && <ConfiguracoesScreen />}

          {activeTab === "perfil" && <PerfilScreen />}
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
