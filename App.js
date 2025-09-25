// App.js - Party RPG com SQLite
import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView, FlatList, StyleSheet, Platform, UIManager, LayoutAnimation, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SQLite from "expo-sqlite";
import { Provider as PaperProvider, Portal, Dialog, Button, Snackbar, SegmentedButtons, Text } from "react-native-paper";

import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";
import AddCharacterForm from "./components/AddCharacterForm";

export default function App() {
  // Estados - variáveis que mudam
  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState("");
  const [db, setDb] = useState(null);
  // Filtro: all | recruited | available
  const [filter, setFilter] = useState("all");
  // Dialogs
  const [confirmRemove, setConfirmRemove] = useState(null); // guarda o personagem a remover
  const [confirmAddVisible, setConfirmAddVisible] = useState(false);
  // Snackbar
  const [snack, setSnack] = useState({ visible: false, message: "" });

  // Ativar animações de layout no Android
  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

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
      // animação suave ao atualizar a lista
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCharacters(result);
    } catch (error) {
      console.error("Erro ao carregar personagens:", error);
    }
  }

  // Mostrar snackbar
  function showSnack(message) {
    setSnack({ visible: true, message });
  }

  // Adicionar novo personagem à party (abre confirmação)
  function addCharacter() {
    if (newCharacter.trim() === "" || !db) return; // Se estiver vazio, não adicionar
    setConfirmAddVisible(true);
  }

  // Confirmar inserção
  async function handleConfirmAdd() {
    if (!db || newCharacter.trim() === "") return;
    try {
      await db.runAsync("INSERT INTO characters (name, recruited) VALUES (?, ?)", [newCharacter.trim(), 0]);
      console.log("Personagem salvo no banco!");
      setConfirmAddVisible(false);
      setNewCharacter(""); // Limpar campo
      loadCharacters(); // Recarregar lista do banco
      showSnack("Personagem adicionado!");
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
      showSnack(newStatus ? `Recrutou ${character.name}` : `Dispensou ${character.name}`);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  }

  // Abrir confirmação para remover personagem
  function requestRemoveCharacter(character) {
    setConfirmRemove(character);
  }

  // Confirmar remoção
  async function handleConfirmRemove() {
    if (!db || !confirmRemove) return;
    try {
      await db.runAsync("DELETE FROM characters WHERE id = ?", [confirmRemove.id]);
      console.log("Personagem removido do banco!");
      setConfirmRemove(null);
      loadCharacters(); // Recarregar lista do banco
      showSnack("Personagem removido!");
    } catch (error) {
      console.error("Erro ao remover personagem:", error);
    }
  }

  // Lista filtrada
  const displayedCharacters = useMemo(() => {
    if (filter === "recruited") return characters.filter((c) => c.recruited === 1);
    if (filter === "available") return characters.filter((c) => c.recruited === 0);
    return characters;
  }, [characters, filter]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <Header />

        {/* Filtro */}
        <View style={styles.filterContainer}>
          <SegmentedButtons
            value={filter}
            onValueChange={setFilter}
            buttons={[
              { value: "all", label: "Todos" },
              { value: "recruited", label: "Recrutados", icon: "star" },
              { value: "available", label: "Disponíveis", icon: "sleep" },
            ]}
          />
        </View>

        {/* Adicionar novo personagem */}
        <AddCharacterForm
          newCharacter={newCharacter}
          setNewCharacter={setNewCharacter}
          addCharacter={addCharacter}
        />

        {/* Lista de personagens */}
        <FlatList
          data={displayedCharacters}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <CharacterCard
              character={item}
              onToggleRecruit={toggleRecruit}
              onRemove={requestRemoveCharacter}
            />
          )}
          style={styles.list}
        />

        {/* Dialogs e Snackbar */}
        <Portal>
          {/* Confirmar adicionar */}
          <Dialog visible={confirmAddVisible} onDismiss={() => setConfirmAddVisible(false)}>
            <Dialog.Title>Adicionar personagem</Dialog.Title>
            <Dialog.Content>
              <Text>Deseja adicionar "{newCharacter}"?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirmAddVisible(false)}>Cancelar</Button>
              <Button onPress={handleConfirmAdd}>Adicionar</Button>
            </Dialog.Actions>
          </Dialog>

          {/* Confirmar remover */}
          <Dialog visible={!!confirmRemove} onDismiss={() => setConfirmRemove(null)}>
            <Dialog.Title>Remover personagem</Dialog.Title>
            <Dialog.Content>
              <Text>Remover "{confirmRemove?.name}" da party?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirmRemove(null)}>Cancelar</Button>
              <Button onPress={handleConfirmRemove}>Remover</Button>
            </Dialog.Actions>
          </Dialog>

          <Snackbar
            visible={snack.visible}
            onDismiss={() => setSnack({ visible: false, message: "" })}
            duration={2500}
          >
            {snack.message}
          </Snackbar>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
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
  filterContainer: {
    marginBottom: 16,
  },
});
