import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const habits = sqliteTable("habits", {
    id: int("id").primaryKey({ autoIncrement: true }),
    user_id: text("user_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    duration: text("duration"),
    category: text("category").notNull(),
    frequency: text("frequency").notNull(),
    start_date: text("start_date").notNull(),
    end_date: text("end_date"),
    is_active: int("is_active").default(1).notNull(),
    created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const habit_entries = sqliteTable("habit_entries", {
    id: int("id").primaryKey({ autoIncrement: true }),
    habit_id: int("habit_id").notNull().references(() => habits.id, { onDelete: "cascade" }),
    is_completed: int("is_completed").default(0).notNull(),
    complete_by: text("complete_by").notNull(),
    completed_at: text("completed_at"),
    created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const journal_entries = sqliteTable("journal_entries", {
    id: int("id").primaryKey({ autoIncrement: true }),
    user_id: text("user_id").notNull(),
    title: text("title").notNull(),
    text: text("text").notNull(),
    date: text("date").default(sql`CURRENT_TIMESTAMP`),
    created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const daily_checks = sqliteTable("daily_checks", {
    id: int("id").primaryKey({ autoIncrement: true }),
    date: text("date").notNull(),
    user_id: text("user_id").notNull(),
    mood_rating: text("mood_rating").notNull(),
    notes: text("notes")
});