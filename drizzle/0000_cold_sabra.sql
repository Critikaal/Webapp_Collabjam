CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text(32) NOT NULL,
	`message` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
