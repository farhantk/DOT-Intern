-- CreateTable
CREATE TABLE `banks` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_methods` (
    `id` VARCHAR(191) NOT NULL,
    `bank_id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `acc_name` VARCHAR(100) NOT NULL,
    `acc_number` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payment_methods` ADD CONSTRAINT `payment_methods_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `banks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
