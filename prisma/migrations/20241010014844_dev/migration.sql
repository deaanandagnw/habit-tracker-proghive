/*
  Warnings:

  - You are about to drop the column `completed_at` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `is_completed` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `DailyProgress` table. All the data in the column will be lost.
  - You are about to drop the column `goal_id` on the `DailyProgress` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `DailyProgress` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `DailyProgress` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalId` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `DailyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DailyProgress" DROP CONSTRAINT "DailyProgress_goal_id_fkey";

-- DropForeignKey
ALTER TABLE "DailyProgress" DROP CONSTRAINT "DailyProgress_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_user_id_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "completed_at",
DROP COLUMN "created_at",
DROP COLUMN "is_completed",
DROP COLUMN "updated_at",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DailyProgress" DROP COLUMN "created_at",
DROP COLUMN "goal_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "goalId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "role",
DROP COLUMN "updated_at",
ADD COLUMN     "biodata" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyProgress" ADD CONSTRAINT "DailyProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyProgress" ADD CONSTRAINT "DailyProgress_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
