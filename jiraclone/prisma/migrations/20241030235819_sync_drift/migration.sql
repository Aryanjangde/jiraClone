/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_TaskAssignees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Project` DROP FOREIGN KEY `Project_managerId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `_TaskAssignees` DROP FOREIGN KEY `_TaskAssignees_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TaskAssignees` DROP FOREIGN KEY `_TaskAssignees_B_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`;

-- DropTable
DROP TABLE `_TaskAssignees`;
