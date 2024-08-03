-- CreateTable
CREATE TABLE `shipments` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `desc` VARCHAR(100) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `condition` VARCHAR(100) NOT NULL DEFAULT 'Baru',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(100) NOT NULL,
    `payment_method_id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NOT NULL,
    `shipment_id` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL DEFAULT 'Menunggu konfirmasi',
    `amount` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_shipment_id_fkey` FOREIGN KEY (`shipment_id`) REFERENCES `shipments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
