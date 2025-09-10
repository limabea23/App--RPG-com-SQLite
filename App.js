// App.js
import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native";
import { initDB, executeSql, executeQuery } from "./db";
import { Platform } from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  // Inicialização do app
  useEffect(() => {
    async function prepare() {
      try {
        await initDB();
        await seedIfEmpty();
        await loadTasks();
      } catch (err) {
        console.error("DB init error", err);
        Alert.alert("Erro", "Falha ao inicializar banco de dados");
      }
    }
    prepare();
  }, []);

  // Adicionar dados de exemplo se estiver vazio
  async function seedIfEmpty() {
    const res = await executeQuery("SELECT COUNT(*) as c FROM tasks;");
    const count = res.rows.item(0).c;
    if (count === 0) {
      await executeSql("INSERT INTO tasks (title, done) VALUES (?, ?);", [
        "Bem-vindo ao SQLite!",
        0,
      ]);
      await executeSql("INSERT INTO tasks (title, done) VALUES (?, ?);", [
        "Toque para marcar como concluída",
        0,
      ]);
    }
  }

  // Carregar todas as tarefas
  async function loadTasks() {
    try {
      const res = await executeQuery("SELECT * FROM tasks ORDER BY id DESC;");
      const rows = [];
      for (let i = 0; i < res.rows.length; i++) {
        rows.push(res.rows.item(i));
      }
      setTasks(rows);
    } catch (err) {
      console.error("loadTasks", err);
      Alert.alert("Erro", "Falha ao carregar tarefas");
    }
  }

  // Adicionar nova tarefa
  async function addTask() {
    const trimmed = title.trim();
    if (!trimmed) return;

    try {
      await executeSql("INSERT INTO tasks (title, done) VALUES (?, ?);", [
        trimmed,
        0,
      ]);
      setTitle("");
      Keyboard.dismiss();
      await loadTasks();
      inputRef.current?.focus();
    } catch (err) {
      console.error("addTask", err);
      Alert.alert("Erro", "Falha ao adicionar tarefa");
    }
  }

  // Alternar status da tarefa
  async function toggleDone(item) {
    try {
      const newDone = item.done ? 0 : 1;
      await executeSql("UPDATE tasks SET done = ? WHERE id = ?;", [
        newDone,
        item.id,
      ]);
      await loadTasks();
    } catch (err) {
      console.error("toggleDone", err);
      Alert.alert("Erro", "Falha ao atualizar tarefa");
    }
  }

  // Excluir tarefa
  async function deleteTask(item) {
    Alert.alert("Confirmar", `Excluir "${item.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await executeSql("DELETE FROM tasks WHERE id = ?;", [item.id]);
            await loadTasks();
          } catch (err) {
            console.error("deleteTask", err);
            Alert.alert("Erro", "Falha ao excluir tarefa");
          }
        },
      },
    ]);
  }

  // Renderizar item da lista
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={[styles.item, item.done ? styles.itemDone : null]}
        onPress={() => toggleDone(item)}
        onLongPress={() => deleteTask(item)}
      >
        <Text style={[styles.itemText, item.done ? styles.itemTextDone : null]}>
          {item.title}
        </Text>
        <Text style={styles.status}>{item.done ? "✓" : ""}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SQLite Tasks</Text>
        <Text style={styles.subtitle}>
          Toque = alternar • Pressione = excluir
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Nova tarefa..."
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma tarefa ainda</Text>
        }
      />

      <TouchableOpacity style={styles.refreshBtn} onPress={loadTasks}>
        <Text style={styles.refreshBtnText}>Atualizar Lista</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  inputRow: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  list: {
    padding: 20,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemDone: {
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  itemTextDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  status: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 10,
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
  refreshBtn: {
    margin: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  refreshBtnText: {
    fontSize: 16,
    color: "#666",
  },
});
