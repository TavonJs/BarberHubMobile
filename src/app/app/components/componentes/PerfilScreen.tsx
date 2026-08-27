import { Text, View } from "react-native";

import { ConfigCard } from "../components/ConfigCard";
import { styles } from "../styles";

export function PerfilScreen() {
  return (
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
  );
}
