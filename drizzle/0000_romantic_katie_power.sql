CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);--> statement-breakpoint
CREATE TABLE `time_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userid` integer NOT NULL,
	`logType` integer NOT NULL,
	`logTime` integer NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `time_logs_email_unique` ON `time_logs` (`email`);