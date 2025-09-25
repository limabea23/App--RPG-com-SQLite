import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏰 Minha Party RPG</Text>
      <Text style={styles.subtitle}>⭐ Recrutado • 💤 Disponível • Toque no ícone para alternar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#E69A28", 
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
    color: "#C5282F", 
  },
});