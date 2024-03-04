/*
  Warnings:

  - The values [USER,ORGANIZER,ADMIN] on the enum `USER_ROLE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "USER_ROLE_new" AS ENUM ('user', 'admin', 'organizer');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "USER_ROLE_new" USING ("role"::text::"USER_ROLE_new");
ALTER TYPE "USER_ROLE" RENAME TO "USER_ROLE_old";
ALTER TYPE "USER_ROLE_new" RENAME TO "USER_ROLE";
DROP TYPE "USER_ROLE_old";
COMMIT;
