/*
  Warnings:

  - You are about to drop the column `likes` on the `artwork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `artwork` DROP COLUMN `likes`;

-- AlterTable
ALTER TABLE `comment` ALTER COLUMN `createdAt` DROP DEFAULT,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `_UserGallery` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserGallery_AB_unique`(`A`, `B`),
    INDEX `_UserGallery_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserGallery` ADD CONSTRAINT `_UserGallery_A_fkey` FOREIGN KEY (`A`) REFERENCES `Gallery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserGallery` ADD CONSTRAINT `_UserGallery_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
