PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habit_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habit_id` integer NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`complete_by` text NOT NULL,
	`completed_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_habit_entries`("id", "habit_id", "is_completed", "complete_by", "completed_at", "created_at", "updated_at") SELECT "id", "habit_id", "is_completed", "complete_by", "completed_at", "created_at", "updated_at" FROM `habit_entries`;--> statement-breakpoint
DROP TABLE `habit_entries`;--> statement-breakpoint
ALTER TABLE `__new_habit_entries` RENAME TO `habit_entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`duration` text NOT NULL,
	`category` text NOT NULL,
	`frequency` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
INSERT INTO `__new_habits`("id", "user_id", "name", "description", "duration", "category", "frequency", "start_date", "end_date", "is_active", "created_at", "updated_at") SELECT "id", "user_id", "name", "description", "duration", "category", "frequency", "start_date", "end_date", "is_active", "created_at", "updated_at" FROM `habits`;--> statement-breakpoint
DROP TABLE `habits`;--> statement-breakpoint
ALTER TABLE `__new_habits` RENAME TO `habits`;