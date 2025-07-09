// sqlite.ts
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Path to your database file
const dbPath = path.resolve(__dirname, "kos.db");

// Initialize database
const db = new Database(dbPath);

// Ensure schema exists
db.exec(`
CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  action TEXT NOT NULL
);
`);

type LogEntry = {
  id: number;
  timestamp: string;
  action: string;
};

export default {};

// // Log a new action
// export function log(
//   action: string,
//   timestamp = new Date().toISOString()
// ): void {
//   const stmt = db.prepare("INSERT INTO logs (timestamp, action) VALUES (?, ?)");
//   stmt.run(timestamp, action);
// }

// // Get all logs, newest first
// export function getLogs(limit = 100): LogEntry[] {
//   const stmt = db.prepare<LogEntry>("SELECT * FROM logs ORDER BY timestamp DESC LIMIT ?");
//   return stmt.all(limit);
// }

// // Get logs for a specific date
// export function getLogsByDate(date: string): LogEntry[] {
//   const stmt = db.prepare(`
//     SELECT * FROM logs
//     WHERE DATE(timestamp) = DATE(?)
//     ORDER BY timestamp ASC
//   `);
//   return stmt.all(date);
// }

// // Delete all logs (careful!)
// export function clearLogs(): void {
//   db.exec("DELETE FROM logs");
// }
