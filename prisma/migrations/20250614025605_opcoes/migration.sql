-- CreateTable
CREATE TABLE `opcoes_de_produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `shape` VARCHAR(191) NOT NULL,
    `radius` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `values` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
