import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
};

export default function ConfigCard({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222",
    padding: 16,
    borderRadius: 10,
    minHeight: 64,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  info: {
    flex: 1,
  },

  label: {
    color: "#666",
    fontSize: 10,
    letterSpacing: 0.5,
  },

  value: {
    color: "#fff",
    fontSize: 15,
    marginTop: 3,
  },

  arrow: {
    color: "#555",
    fontSize: 26,
  },
});
