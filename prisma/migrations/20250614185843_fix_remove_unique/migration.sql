/*
  Warnings:

  - Made the column `use_in_menu` on table `Categories` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Categories_use_in_menu_key` ON `Categories`;

-- AlterTable
ALTER TABLE `Categories` MODIFY `use_in_menu` BOOLEAN NOT NULL;
