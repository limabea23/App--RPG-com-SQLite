import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

export default function AddCharacterForm({ newCharacter, setNewCharacter, addCharacter }) {
    return (
        <View style={styles.inputRow}>
            <TextInput
                style={styles.input}
                placeholder="🎭 Nome do novo personagem..."
                value={newCharacter}
                onChangeText={setNewCharacter}
                onSubmitEditing={addCharacter}
                mode="outlined"
                theme={{ 
                    colors: { 
                        primary: "#C5282F",
                        underlineColor: "transparent" 
                    },
                }}
            />

            <Button
                mode="contained"
                onPress={addCharacter}
                style={styles.button}
                buttonColor="#C5282F"        
                textColor="#C8E6C9"          
                icon="sword-cross"                 
                compact
                accessibilityLabel="Adicionar personagem"
            />
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
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E69A28",
  },
});