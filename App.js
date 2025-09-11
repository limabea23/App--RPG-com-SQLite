// App.js - Party RPG com SQLite
import React, { useState, useEffect } from "react";
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
import * as SQLite from "expo-sqlite";

// Conectar ao banco SQLite
const db = SQLite.openDatabaseSync("party.db");

export default function App() {
  // Estados - variáveis que mudam
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState("");

  // Criar tabela e carregar dados quando app iniciar
  useEffect(() => {
    try {
      // Criar tabela se não existir
      db.execSync("CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, recruited INTEGER);");
      console.log("Tabela criada!");
      
      // Verificar se há dados
      const result = db.getFirstSync("SELECT COUNT(*) as count FROM characters");
      
      if (result.count === 0) {
        // Inserir personagens iniciais
        db.runSync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["🧙‍♂️ Gandalf o Mago", 0]);
        db.runSync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["⚔️ Aragorn o Guerreiro", 1]);
        db.runSync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["🏹 Legolas o Arqueiro", 0]);
      }
      
      loadCharacters();
    } catch (error) {
      console.log("Erro ao inicializar banco:", error);
    }
  }, []);

  // Carregar personagens do banco
  function loadCharacters() {
    try {
      const result = db.getAllSync("SELECT * FROM characters ORDER BY id DESC");
      setCharacters(result);
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  }

  // Adicionar novo personagem à party
  function addCharacter() {
    if (newCharacter === "") return; // Se estiver vazio, não adicionar
    
    try {
      // Salvar no banco SQLite
      db.runSync("INSERT INTO characters (name, recruited) VALUES (?, ?)", [newCharacter, 0]);
      console.log("Personagem salvo no banco!");
      loadCharacters(); // Recarregar lista do banco
      setNewCharacter(""); // Limpar campo
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  }

  // Recrutar/dispensar personagem
  function toggleRecruit(character) {
    const newStatus = character.recruited ? 0 : 1;
    
    try {
      // Atualizar no banco SQLite
      db.runSync("UPDATE characters SET recruited = ? WHERE id = ?", [newStatus, character.id]);
      console.log("Status atualizado no banco!");
      loadCharacters(); // Recarregar lista do banco
    } catch (error) {
      console.log("Erro ao atualizar:", error);
    }
  }

  // Remover personagem da party
  function removeCharacter(character) {
    Alert.alert("Remover Personagem", `Remover "${character.name}" da party?`, [
      { text: "Não" },
      { 
        text: "Sim", 
        onPress: () => {
          try {
            // Remover do banco SQLite
            db.runSync("DELETE FROM characters WHERE id = ?", [character.id]);
            console.log("Personagem removido do banco!");
            loadCharacters(); // Recarregar lista do banco
          } catch (error) {
            console.log("Erro ao remover:", error);
          }
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
    backgroundColor: "#1A0E0A", // Vermelho D&D muito escuro
    paddingTop: 50, // Espaço para status bar
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#E69A28", // Dourado D&D oficial
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#C5282F", // Vermelho D&D
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E69A28", // Dourado D&D
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F4E4BC", // Pergaminho D&D
    color: "#1A0E0A",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#C5282F", // Vermelho D&D oficial
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    borderWidth: 2,
    borderColor: "#E69A28", // Borda dourada D&D
  },
  buttonText: {
    color: "#E69A28", // Dourado D&D
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  character: {
    backgroundColor: "#2C1810", // Marrom D&D
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#58180D", // Vermelho escuro D&D
  },
  characterRecruited: {
    backgroundColor: "#58180D", // Vermelho escuro D&D para recrutado
    borderColor: "#E69A28", // Dourado D&D
    borderWidth: 2,
  },
  characterText: {
    flex: 1,
    fontSize: 16,
    color: "#F4E4BC", // Pergaminho D&D
    fontWeight: "500",
  },
  characterRecruitedText: {
    color: "#E69A28", // Dourado D&D para recrutados
    fontWeight: "bold",
  },
  status: {
    fontSize: 20,
    marginLeft: 10,
  },
});
