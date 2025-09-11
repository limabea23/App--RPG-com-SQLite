/**
 * 📚 GUIA COMPLETO DO PROJETO - LISTA DE TAREFAS COM SQLite
 * =========================================================
 * 
 * 🎯 OBJETIVO: Ensinar React Native + SQLite de forma SUPER SIMPLES!
 * 
 * ========================================
 * 🧠 CONCEITOS QUE VOCÊ VAI APRENDER:
 * ========================================
 * 
 * 1. 📱 REACT NATIVE BÁSICO
 *    ✅ Como criar componentes
 *    ✅ Como usar estados (useState)
 *    ✅ Como usar efeitos (useEffect)
 *    ✅ Como criar listas (FlatList)
 *    ✅ Como capturar toques do usuário
 * 
 * 2. 💾 BANCO DE DADOS SQLite
 *    ✅ Como conectar ao banco
 *    ✅ Como criar tabelas
 *    ✅ Como inserir dados (CREATE)
 *    ✅ Como ler dados (READ)
 *    ✅ Como atualizar dados (UPDATE)
 *    ✅ Como excluir dados (DELETE)
 * 
 * 3. 🎨 INTERFACE DO USUÁRIO
 *    ✅ Como organizar elementos na tela
 *    ✅ Como estilizar componentes
 *    ✅ Como fazer botões funcionarem
 *    ✅ Como mostrar alertas
 * 
 * ========================================
 * 📋 ESTRUTURA SUPER SIMPLES DO PROJETO:
 * ========================================
 * 
 * mobile-sqlite-app/
 * ├── App.js              👈 TODO O CÓDIGO ESTÁ AQUI! (apenas 80 linhas)
 * ├── package.json        👈 Lista de dependências
 * ├── app.json           👈 Configurações do Expo
 * ├── index.js           👈 Ponto de entrada (não mexer)
 * └── assets/            👈 Ícones do app
 * 
 * 🎓 POR QUE TUDO EM 1 ARQUIVO?
 * - Mais fácil para iniciantes
 * - Não precisa ficar procurando código em vários lugares
 * - Você vê todo o fluxo de uma vez
 * - Ideal para aprender!
 * 
 * ========================================
 * 🔍 VAMOS ENTENDER O App.js LINHA POR LINHA:
 * ========================================
 * 
 * 📦 IMPORTS (o que precisamos usar):
 * ```javascript
 * import React, { useEffect, useState } from "react";
 * import { SafeAreaView, View, Text, ... } from "react-native";
 * import * as SQLite from "expo-sqlite";
 * ```
 * 
 * 🗄️ CONEXÃO COM BANCO:
 * ```javascript
 * const db = SQLite.openDatabaseSync("tarefas.db");
 * ```
 * ☝️ Isso cria/conecta ao arquivo "tarefas.db" no celular
 * 
 * 📊 ESTADOS (variáveis que mudam):
 * ```javascript
 * const [tasks, setTasks] = useState([]);      // Lista de tarefas
 * const [newTask, setNewTask] = useState("");  // Texto da nova tarefa
 * ```
 * ☝️ useState = "Ei React, essa variável pode mudar!"
 * 
 * ⚡ EFEITO INICIAL:
 * ```javascript
 * useEffect(() => {
 *   setupDatabase();  // Criar tabela
 *   loadTasks();      // Carregar tarefas
 * }, []);
 * ```
 * ☝️ useEffect = "Execute isso quando o app abrir"
 * 
 * ========================================
 * 🛠️ FUNÇÕES DO APP (o que cada uma faz):
 * ========================================
 * 
 * 1️⃣ setupDatabase()
 *    - Cria a tabela "tasks" se não existir
 *    - SQL: CREATE TABLE IF NOT EXISTS...
 * 
 * 2️⃣ loadTasks()
 *    - Busca todas as tarefas no banco
 *    - SQL: SELECT * FROM tasks...
 *    - Atualiza a lista na tela
 * 
 * 3️⃣ addTask()
 *    - Adiciona nova tarefa no banco
 *    - SQL: INSERT INTO tasks...
 *    - Limpa o campo de texto
 *    - Recarrega a lista
 * 
 * 4️⃣ toggleTask()
 *    - Muda tarefa: feita ↔ não feita
 *    - SQL: UPDATE tasks SET done = ...
 *    - Recarrega a lista
 * 
 * 5️⃣ deleteTask()
 *    - Pergunta se quer excluir
 *    - SQL: DELETE FROM tasks...
 *    - Recarrega a lista
 * 
 * 6️⃣ renderTask()
 *    - Como mostrar cada tarefa na lista
 *    - Retorna um TouchableOpacity com texto
 * 
 * ========================================
 * 🗃️ ESTRUTURA DA TABELA NO BANCO:
 * ========================================
 * 
 * Tabela: tasks
 * ┌──────┬───────────┬──────────┬─────────────────────┐
 * │ id   │ title     │ done     │ Descrição           │
 * ├──────┼───────────┼──────────┼─────────────────────┤
 * │ 1    │ "Estudar" │ 0        │ 0 = não feita       │
 * │ 2    │ "Comer"   │ 1        │ 1 = feita           │
 * │ 3    │ "Dormir"  │ 0        │ 0 = não feita       │
 * └──────┴───────────┴──────────┴─────────────────────┘
 * 
 * 📝 EXPLICAÇÃO DOS CAMPOS:
 * - id: Número único para cada tarefa (1, 2, 3...)
 * - title: O texto da tarefa ("Estudar React Native")
 * - done: 0 ou 1 (0 = não feita, 1 = feita)
 * 
 * ========================================
 * 🎮 COMO O USUÁRIO INTERAGE:
 * ========================================
 * 
 * 1. 📝 ADICIONAR TAREFA:
 *    - Digite no campo de texto
 *    - Toque no botão "+" OU aperte Enter
 *    - A tarefa aparece na lista
 * 
 * 2. ✅ MARCAR COMO FEITA:
 *    - Toque em qualquer tarefa
 *    - Ela fica riscada (linha no meio)
 *    - O "○" vira "✓"
 * 
 * 3. 🗑️ EXCLUIR TAREFA:
 *    - Segure o dedo em uma tarefa (long press)
 *    - Aparece pergunta "Excluir?"
 *    - Toque "Sim" para confirmar
 * 
 * ========================================
 * 🔧 COMANDOS SQL USADOS (aprenda!):
 * ========================================
 * 
 * 📋 CRIAR TABELA:
 * CREATE TABLE IF NOT EXISTS tasks (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   title TEXT NOT NULL,
 *   done INTEGER DEFAULT 0
 * );
 * 
 * 📖 LER TODAS AS TAREFAS:
 * SELECT * FROM tasks ORDER BY id DESC;
 * 
 * ➕ ADICIONAR NOVA TAREFA:
 * INSERT INTO tasks (title, done) VALUES (?, ?);
 * 
 * ✏️ ATUALIZAR TAREFA:
 * UPDATE tasks SET done = ? WHERE id = ?;
 * 
 * 🗑️ EXCLUIR TAREFA:
 * DELETE FROM tasks WHERE id = ?;
 * 
 * ========================================
 * 💡 DICAS PARA ESTUDAR:
 * ========================================
 * 
 * 1. 📚 COMECE DEVAGAR:
 *    - Entenda useState primeiro
 *    - Depois useEffect
 *    - Por último SQLite
 * 
 * 2. 🔍 EXPERIMENTE:
 *    - Mude cores nos estilos
 *    - Adicione novos campos
 *    - Teste quebrar e consertar
 * 
 * 3. 🎯 DESAFIOS:
 *    - Adicionar data de criação
 *    - Fazer contador de tarefas
 *    - Criar categorias
 *    - Adicionar prioridades
 * 
 * 4. 📱 TESTE NO CELULAR:
 *    - Use Expo Go
 *    - Veja como fica no device real
 *    - SQLite salva mesmo fechando o app!
 * 
 * ========================================
 * 🚀 PRÓXIMOS PASSOS PARA EVOLUIR:
 * ========================================
 * 
 * 🟢 FÁCIL (para iniciantes):
 * - Mudar cores e ícones
 * - Adicionar contador de tarefas
 * - Mostrar data de criação
 * - Adicionar validações
 * 
 * 🟡 MÉDIO (depois de praticar):
 * - Categorias de tarefas
 * - Filtros (feitas/não feitas)
 * - Busca por texto
 * - Temas claro/escuro
 * 
 * 🔴 DIFÍCIL (quando for ninja):
 * - Sincronização com servidor
 * - Notificações push
 * - Backup na nuvem
 * - Compartilhar listas
 * 
 * ========================================
 * 🎓 LEMBRA: PRATIQUE MUITO!
 * ========================================
 * 
 * A programação se aprende FAZENDO! 
 * 
 * - Quebre o código e conserte
 * - Faça pequenas modificações
 * - Teste no celular
 * - Pergunte quando tiver dúvidas
 * 
 * Você consegue! 🚀📱💪
 */
