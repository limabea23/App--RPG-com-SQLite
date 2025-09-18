import React from "react";
import {View, Text, StyleSheet} from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏰 Minha Party RPG</Text>
      <Text style={styles.subtitle}>⭐ Recrutado • 💤 Disponível • Segure para remover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 20,
    color: "#C5282F", 
  },
})