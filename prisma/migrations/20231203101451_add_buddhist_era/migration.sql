/*
  Warnings:

  - Added the required column `date_of_birth_buddhist` to the `Identification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_expiry_buddhist` to the `Identification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_issue_buddhist` to the `Identification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identification" ADD COLUMN     "date_of_birth_buddhist" DATE NOT NULL,
ADD COLUMN     "date_of_expiry_buddhist" DATE NOT NULL,
ADD COLUMN     "date_of_issue_buddhist" DATE NOT NULL;
