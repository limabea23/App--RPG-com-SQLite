// App.js - Lista de Tarefas SUPER SIMPLES (sem banco por enquanto)
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // Estados - variáveis que mudam
  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 1 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 }
  ]);
  const [newCharacter, setNewCharacter] = useState("");

  // Adicionar novo personagem à party
  function addCharacter() {
    if (newCharacter === "") return; // Se estiver vazio, não adicionar
    
    const newId = characters.length + 1; // ID simples: próximo número
    const newCharacterObj = {
      id: newId,
      name: newCharacter,
      recruited: 0 // 0 = não recrutado, 1 = recrutado
    };
    
    const newList = [newCharacterObj]; // Novo personagem primeiro
    const allCharacters = newList.concat(characters); // Juntar com os antigos
    setCharacters(allCharacters); // Atualizar lista
    setNewCharacter(""); // Limpar campo
  }

  // Recrutar/dispensar personagem
  function toggleRecruit(character) {
    const newCharacters = [];
    for (let i = 0; i < characters.length; i++) {
      const currentChar = characters[i];
      if (currentChar.id === character.id) {
        // Este é o personagem que queremos mudar
        const newStatus = currentChar.recruited ? 0 : 1;
        newCharacters.push({
          id: currentChar.id,
          name: currentChar.name,
          recruited: newStatus
        });
      } else {
        // Este personagem não muda
        newCharacters.push(currentChar);
      }
    }
    setCharacters(newCharacters);
  }

  // Remover personagem da party
  function removeCharacter(character) {
    Alert.alert("Remover Personagem", `Remover "${character.name}" da party?`, [
      { text: "Não" },
      { 
        text: "Sim", 
        onPress: () => {
          const newList = [];
          for (let i = 0; i < characters.length; i++) {
            if (characters[i].id !== character.id) {
              newList.push(characters[i]);
            }
          }
          setCharacters(newList);
        }
      }
    ]);
  }

  // Como mostrar cada personagem
  function renderCharacter({ item }) {
    return (
      <TouchableOpacity
        style={[styles.character, item.recruited && styles.characterRecruited]}
        onPress={() => toggleRecruit(item)}
        onLongPress={() => removeCharacter(item)}
      >
        <Text style={[styles.characterText, item.recruited && styles.characterRecruitedText]}>
          {item.name}
        </Text>
        <Text style={styles.status}>
          {item.recruited ? "⭐" : "💤"}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {/* Título */}
      <Text style={styles.title}>🏰 Minha Party RPG</Text>
      <Text style={styles.subtitle}>⭐ Recrutado • 💤 Disponível • Segure para remover</Text>

      {/* Adicionar novo personagem */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="🎭 Nome do novo personagem..."
          value={newCharacter}
          onChangeText={setNewCharacter}
          onSubmitEditing={addCharacter}
        />
        <TouchableOpacity style={styles.button} onPress={addCharacter}>
          <Text style={styles.buttonText}>⚔️</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de personagens */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderCharacter}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

// Estilos simples
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c1810", // Fundo escuro medieval
    paddingTop: 50, // Espaço para status bar
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#FFD700", // Dourado real
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#B8860B", // Dourado mais escuro
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#8B4513", // Marrom medieval
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F5E6D3", // Pergaminho
    color: "#2c1810",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8B0000", // Vermelho sangue
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#3C2E26", // Marrom escuro
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8B4513",
  },
  characterRecruited: {
    backgroundColor: "#2F4F2F", // Verde escuro para recrutado
    borderColor: "#FFD700",
    borderWidth: 2,
  },
  characterText: {
    flex: 1,
    fontSize: 16,
    color: "#F5E6D3", // Cor de pergaminho
    fontWeight: "500",
  },
  characterRecruitedText: {
    color: "#FFD700", // Dourado para recrutados
    fontWeight: "bold",
  },
  status: {
    fontSize: 20,
    marginLeft: 10,
  },
});
