-- CreateTable
CREATE TABLE "creator_profiles" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "displayName" VARCHAR(100) NOT NULL,
    "bio" TEXT,
    "category" VARCHAR(50) NOT NULL,
    "tags" TEXT[],
    "city" VARCHAR(100),
    "country" VARCHAR(100),
    "linkInstagram" VARCHAR(255),
    "linkTwitter" VARCHAR(255),
    "linkOnlyfans" VARCHAR(255),
    "linkWebsite" VARCHAR(255),
    "seoTitle" VARCHAR(60),
    "seoDescription" VARCHAR(160),
    "longBio" TEXT,
    "backgroundTheme" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "creator_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "creator_profiles_userId_key" ON "creator_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "creator_profiles_username_key" ON "creator_profiles"("username");

-- CreateIndex
CREATE INDEX "idx_cp_user_id" ON "creator_profiles"("userId");

-- CreateIndex
CREATE INDEX "idx_cp_username" ON "creator_profiles"("username");

-- CreateIndex
CREATE INDEX "idx_cp_category" ON "creator_profiles"("category");

-- CreateIndex
CREATE INDEX "idx_cp_country" ON "creator_profiles"("country");
