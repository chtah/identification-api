/*
  Warnings:

  - A unique constraint covering the columns `[identification_number]` on the table `Identification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Identification_identification_number_key" ON "Identification"("identification_number");
