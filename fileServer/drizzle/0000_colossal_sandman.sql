CREATE TABLE `files` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(36) NOT NULL,
	`owner` varchar(255) NOT NULL,
	`size` bigint unsigned,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_name_unique` UNIQUE(`name`)
);
