import DatabaseConstructor, { Database } from 'better-sqlite3';

const db: Database = new DatabaseConstructor(process.env.GAME_DB!);
db.pragma('journal_mode = WAL');

db.exec(
    `CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY,
        did TEXT NOT NULL,
        room_seed INTEGER NOT NULL,
        current_room INTEGER NOT NULL DEFAULT 0
    )`
);

db.exec(
    `CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        game_id INTEGER NOT NULL,
        FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE
    )`
);

export { db };
