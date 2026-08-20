import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(db: SQLiteDatabase) {
    try {
        // await db.execAsync(`DROP TABLE habits;`);
        // await db.execAsync(`DROP TABLE habit_entries;`);
        // await db.execAsync(`DROP TABLE journal_entries;`);
        // await db.execAsync(`DROP TABLE daily_checks;`);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id UUID NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                duration TEXT,
                category TEXT CHECK(category IN ('Physical', 'Social', 'Spiritual', 'Intellectual')) NOT NULL,
                frequency TEXT NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE,
                is_active BOOLEAN NOT NULL DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await db.execAsync(`
            CREATE INDEX IF NOT EXISTS idx_habits_user_id ON habits(user_id);
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
            CREATE INDEX IF NOT EXISTS idx_habit_entries_habit_id ON habit_entries(habit_id);
        `);

        await db.execAsync(`
            CREATE INDEX IF NOT EXISTS idx_habit_entries_complete_by ON habit_entries(complete_by);
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS journal_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id UUID NOT NULL,
                title TEXT NOT NULL,
                text TEXT NOT NULL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS daily_checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATETIME NOT NULL,
                user_id UUID NOT NULL,
                mood_rating TEXT CHECK(mood_rating IN ('poor', 'fair', 'good', 'excellent')) NOT NULL,
                notes TEXT
            );
        `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}
