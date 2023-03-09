import DatabaseConstructor, { Database } from 'better-sqlite3';

const db: Database = new DatabaseConstructor(process.env.GAME_DB!);
db.pragma('journal_mode = WAL');

export interface GameRow {
    id: number;
    did: string;
    roomSeed: number;
    currentRoom: number;
}

export interface CardRow {
    id: string;
    gameId: number;
}

db.exec(
    `CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY,
        did TEXT NOT NULL,
        roomSeed INTEGER NOT NULL,
        currentRoom INTEGER NOT NULL DEFAULT 0
    )`
);

db.exec(
    `CREATE TABLE IF NOT EXISTS cards (
        id TEXT PRIMARY KEY,
        gameId INTEGER NOT NULL,
        FOREIGN KEY(gameId) REFERENCES games(id) ON DELETE CASCADE
    )`
);

export { db };
