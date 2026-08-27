import { Text, View } from "react-native";

import { ConfigCard } from "../components/ConfigCard";
import { styles } from "../styles";

export function ConfiguracoesScreen() {
  return (
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
  );
}
