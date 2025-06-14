/*
  Warnings:

  - Made the column `use_in_menu` on table `produtos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `produtos` MODIFY `use_in_menu` BOOLEAN NOT NULL;
