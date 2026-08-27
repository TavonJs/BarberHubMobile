import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "../styles";
import { MenuButton } from "./MenuButton";

export function SideMenu({
  activeTab,
  onNavigate,
  onClose,
}: {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onClose: () => void;
}) {
  return (
    <View style={styles.drawerWrapper}>
      <TouchableOpacity
        style={styles.drawerBackground}
        activeOpacity={1}
        onPress={onClose}
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

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.drawerNav}>
          <MenuButton
            icon="📊"
            title="Dashboard"
            active={activeTab === "dashboard"}
            onPress={() => onNavigate("dashboard")}
          />

          <MenuButton
            icon="👤"
            title="Clientes"
            active={activeTab === "clientes"}
            onPress={() => onNavigate("clientes")}
          />

          <MenuButton
            icon="✂️"
            title="Serviços"
            active={activeTab === "servicos"}
            onPress={() => onNavigate("servicos")}
          />

          <MenuButton
            icon="📅"
            title="Agendamentos"
            active={activeTab === "agendamentos"}
            onPress={() => onNavigate("agendamentos")}
          />

          <MenuButton
            icon="🕒"
            title="Horários"
            active={activeTab === "horarios"}
            onPress={() => onNavigate("horarios")}
          />

          <MenuButton
            icon="⚙️"
            title="Configurações"
            active={activeTab === "configuracoes"}
            onPress={() => onNavigate("configuracoes")}
          />

          <MenuButton
            icon="👤"
            title="Perfil"
            active={activeTab === "perfil"}
            onPress={() => onNavigate("perfil")}
          />
        </View>
      </View>
    </View>
  );
}
