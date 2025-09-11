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

export default function App() {
  // Estados - variáveis que mudam
  const [tasks, setTasks] = useState([
    { id: 1, title: "Exemplo de tarefa", done: 0 },
    { id: 2, title: "Tarefa concluída", done: 1 }
  ]);
  const [newTask, setNewTask] = useState("");

  // Adicionar nova tarefa
  function addTask() {
    if (newTask === "") return; // Se estiver vazio, não adicionar
    
    const newId = tasks.length + 1; // ID simples: próximo número
    const newTaskObj = {
      id: newId,
      title: newTask,
      done: 0
    };
    
    const newList = [newTaskObj]; // Nova tarefa primeiro
    const allTasks = newList.concat(tasks); // Juntar com as antigas
    setTasks(allTasks); // Atualizar lista
    setNewTask(""); // Limpar campo
  }

  // Marcar tarefa como feita/não feita
  function toggleTask(task) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const currentTask = tasks[i];
      if (currentTask.id === task.id) {
        // Esta é a tarefa que queremos mudar
        const newStatus = currentTask.done ? 0 : 1;
        newTasks.push({
          id: currentTask.id,
          title: currentTask.title,
          done: newStatus
        });
      } else {
        // Esta tarefa não muda
        newTasks.push(currentTask);
      }
    }
    setTasks(newTasks);
  }

  // Excluir tarefa
  function deleteTask(task) {
    Alert.alert("Excluir", `Excluir "${task.title}"?`, [
      { text: "Não" },
      { 
        text: "Sim", 
        onPress: () => {
          const filteredTasks = tasks.filter(t => t.id !== task.id);
          setTasks(filteredTasks);
        }
      }
    ]);
  }

  // Como mostrar cada tarefa
  function renderTask({ item }) {
    return (
      <TouchableOpacity
        style={[styles.task, item.done && styles.taskDone]}
        onPress={() => toggleTask(item)}
        onLongPress={() => deleteTask(item)}
      >
        <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
          {item.title}
        </Text>
        <Text style={styles.status}>
          {item.done ? "✓" : "○"}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>📝 Lista de Tarefas</Text>

      {/* Adicionar nova tarefa */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTask}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

// Estilos simples
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  task: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDone: {
    backgroundColor: "#e0e0e0",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  status: {
    fontSize: 18,
    marginLeft: 10,
  },
});
