CREATE TABLE `employees_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`department` text NOT NULL,
	`hired_date` integer NOT NULL,
	`status` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_table_email_unique` ON `employees_table` (`email`);--> statement-breakpoint
DROP INDEX IF EXISTS `time_logs_email_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS "users_table_username_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "users_table_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "employees_table_email_unique";--> statement-breakpoint
ALTER TABLE `time_logs` ALTER COLUMN "logTime" TO "logTime" text NOT NULL DEFAULT (strftime('%H:%M:%S:%fZ', 'now'));--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_username_unique` ON `users_table` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
ALTER TABLE `time_logs` ADD `logDate` text DEFAULT (strftime('%Y-%m-%dT:%fZ', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `time_logs` ADD `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `time_logs` ADD `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `time_logs` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `users_table` ADD `username` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now')) NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `users_table` DROP COLUMN `age`;