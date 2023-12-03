/*
  Warnings:

  - Added the required column `title_eng` to the `Identification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_thai` to the `Identification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identification" ADD COLUMN     "title_eng" TEXT NOT NULL,
ADD COLUMN     "title_thai" TEXT NOT NULL;
