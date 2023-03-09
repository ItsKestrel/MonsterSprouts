import DatabaseConstructor, { Database } from 'better-sqlite3';

const db: Database = new DatabaseConstructor(process.env.GAME_DB!);
db.pragma('journal_mode = WAL');

db.prepare(
    `CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY,
        did TEXT NOT NULL,
        
    )`
);

export { db };
