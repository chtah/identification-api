-- CreateTable
CREATE TABLE "Identification" (
    "id" UUID NOT NULL,
    "identification_number" INTEGER NOT NULL,
    "name_thai" TEXT NOT NULL,
    "surename_thai" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "surename_eng" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "religion" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date_of_issue" DATE NOT NULL,
    "date_of_expiry" DATE NOT NULL,

    CONSTRAINT "Identification_pkey" PRIMARY KEY ("id")
);
