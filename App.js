// App.js - Party RPG com SQLite
import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";

import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";
import AddCharacterForm from "./components/AddCharacterForm";

export default function App() {
  // Estados - variáveis que mudam
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState("");
  const [db, setDb] = useState(null);
    
  // Criar tabela e carregar dados quando app iniciar
  useEffect(() => {
    async function initializeDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync("party.db");
        setDb(database);
        
        // Criar tabela se não existir
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            recruited INTEGER
          );
        `);
        console.log("Tabela criada!");
        
        // Verificar se há dados
        const result = await database.getFirstAsync("SELECT COUNT(*) as count FROM characters");
        
        if (result.count === 0) {
          // Inserir personagens iniciais
          await database.runAsync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["🧙‍♂️ Gandalf o Mago", 0]);
          await database.runAsync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["⚔️ Aragorn o Guerreiro", 1]);
          await database.runAsync("INSERT INTO characters (name, recruited) VALUES (?, ?)", ["🏹 Legolas o Arqueiro", 0]);
        }
        
        loadCharacters(database);
      } catch (error) {
        console.error("Erro ao inicializar banco:", error);
      }
    }

    initializeDatabase();
  }, []);

  // Carregar personagens do banco
  async function loadCharacters(database = db) {
    if (!database) return;
    
    try {
      const result = await database.getAllAsync("SELECT * FROM characters ORDER BY id DESC");
      setCharacters(result);
    } catch (error) {
      console.error("Erro ao carregar personagens:", error);
    }
  }

  // Adicionar novo personagem à party
  async function addCharacter() {
    if (newCharacter === "" || !db) return; // Se estiver vazio, não adicionar
    
    try {
      await db.runAsync("INSERT INTO characters (name, recruited) VALUES (?, ?)", [newCharacter, 0]);
      console.log("Personagem salvo no banco!");
      loadCharacters(); // Recarregar lista do banco
      setNewCharacter(""); // Limpar campo
    } catch (error) {
      console.error("Erro ao adicionar personagem:", error);
    }
  }

  // Recrutar/dispensar personagem
  async function toggleRecruit(character) {
    if (!db) return;
    
    const newStatus = character.recruited ? 0 : 1;
    
    try {
      await db.runAsync("UPDATE characters SET recruited = ? WHERE id = ?", [newStatus, character.id]);
      console.log("Status atualizado no banco!");
      loadCharacters(); // Recarregar lista do banco
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  // Remover personagem da party
  function removeCharacter(character) {
    Alert.alert("Remover Personagem", `Remover "${character.name}" da party?`, [
      { text: "Não" },
      { 
        text: "Sim", 
        onPress: async () => {
          if (!db) return;
          
          try {
            await db.runAsync("DELETE FROM characters WHERE id = ?", [character.id]);
            console.log("Personagem removido do banco!");
            loadCharacters(); // Recarregar lista do banco
          } catch (error) {
            console.error("Erro ao remover personagem:", error);
          }
        }
      }
    ]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Header />

      {/* Adicionar novo personagem */}
      <AddCharacterForm
        newCharacter={newCharacter}
        setNewCharacter={setNewCharacter}
        addCharacter={addCharacter}
      />

      {/* Lista de personagens */}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onToggleRecruit={toggleRecruit}
            onRemove={removeCharacter}
          />
        )}
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
  list: {
    flex: 1,
  },
});
