/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Task_userId_fkey` ON `Task`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `userId`;
