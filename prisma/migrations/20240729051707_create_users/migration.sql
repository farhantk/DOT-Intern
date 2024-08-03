-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
