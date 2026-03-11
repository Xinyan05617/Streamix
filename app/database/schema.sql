-- database/schema.sql
CREATE TABLE IF NOT EXISTS erabiltzaileak (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    izena TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pasahitza TEXT NOT NULL,
    administratzailea INTEGER DEFAULT 0
);