// db.js
import * as SQLite from "expo-sqlite";

// Inicializar banco de dados SQLite para mobile
const db = SQLite.openDatabaseSync("app.db");

// Helper para executar SQL com Promises
export async function executeSql(sql, params = []) {
  try {
    const result = await db.runAsync(sql, params);
    return result;
  } catch (error) {
    console.error("executeSql error:", error);
    throw error;
  }
}

// Função para fazer SELECT queries
export async function executeQuery(sql, params = []) {
  try {
    const result = await db.getAllAsync(sql, params);
    return {
      rows: {
        length: result.length,
        item: (i) => result[i],
        _array: result,
      },
    };
  } catch (error) {
    console.error("executeQuery error:", error);
    throw error;
  }
}

// Inicializar o banco de dados
export async function initDB() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now','localtime'))
      );
    `);
  } catch (error) {
    throw error;
  }
}
