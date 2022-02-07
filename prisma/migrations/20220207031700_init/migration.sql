/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lastName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `lastName` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_lastName_key` ON `User`(`lastName`);
