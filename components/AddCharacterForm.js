import React from "react";
import { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

export default function AddCharacterForm({ newCharacter, setNewCharacter, addCharacter }) {
    return (
        <View style={styles.inputRow}>
            <TextInput
                style={styles.input}
                placeholder="🎭 Nome do novo personagem..."
                value={newCharacter}
                onChangeText={setNewCharacter}
                onSubmitEditing={addCharacter}
                placeholderTextColor="#1A0E0A"
            />

            <TouchableOpacity style={styles.button} onPress={addCharacter}>
                <Text style={styles.buttonText}>⚔️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E69A28", 
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F4E4BC", 
    color: "#1A0E0A",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#C5282F", 
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderWidth: 2,
    borderColor: "#E69A28",
  },
  buttonText: {
    color: "#C8E6C9", 
    fontSize: 18,
    textAlign: "center",
  },
});