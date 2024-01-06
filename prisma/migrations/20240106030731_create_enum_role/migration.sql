-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User';
