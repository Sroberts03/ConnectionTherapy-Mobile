import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {
    try {
        await db.execAsync(`
            DROP TABLE IF EXISTS habit_entries;
            DROP TABLE IF EXISTS habits;
            DROP TABLE IF EXISTS journal_entries;
            DROP TABLE IF EXISTS daily_checks;
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                duration TEXT,
                category TEXT CHECK(category IN ('Physical', 'Social', 'Spiritual', 'Intellectual')) NOT NULL,
                frequency TEXT NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE,
                is_active BOOLEAN NOT NULL DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS habit_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                habit_id INTEGER NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
                is_completed BOOLEAN NOT NULL DEFAULT FALSE,
                complete_by DATETIME NOT NULL,
                completed_at DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS journal_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                text TEXT NOT NULL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS daily_checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATETIME NOT NULL,
                mood_rating TEXT CHECK(mood_rating IN ('poor', 'fair', 'good', 'excellent')) NOT NULL,
                notes TEXT
            );
        `);

        await db.execAsync(`
            INSERT INTO habits (name, description, duration, category, frequency, start_date, end_date, is_active)
            VALUES 
                ("Run a mile", "Run a mile every day", "1 mile", "Physical", "every day", "2026-08-12", null, true),
                ("Meditate", "Meditate every day", "20 minutes", "Spiritual", "every day", "2026-08-12", null, true),
                ("Read", "Read a book every day", "30 minutes", "Intellectual", "every day", "2026-08-12", null, true),
                ("Call a friend", "Call a friend every day", "15 minutes", "Social", "every day", "2026-08-12", null, true)
        `)

        await db.execAsync(`
            INSERT INTO habit_entries (habit_id, complete_by)
            VALUES 
                (1, "2026-08-12"),
                (2, "2026-08-12"),
                (3, "2026-08-12"),
                (4, "2026-08-12")
        `)

        await db.execAsync(`
            INSERT INTO journal_entries (title, text)
            VALUES 
                ("Journal entry 1", "This is the first journal entry."),
                ("Journal entry 2", "This is the second journal entry.")
        `)

        await db.execAsync(`
            INSERT INTO daily_checks (date, mood_rating, notes)
            VALUES 
                ("2026-08-12", "good", "This is the first daily check."),
                ("2026-08-11", "fair", "This is the second daily check.")
        `)

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
