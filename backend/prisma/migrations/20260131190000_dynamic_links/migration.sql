-- Migration: Convert fixed link fields to dynamic JSON array

-- Step 1: Add the new links column
ALTER TABLE "creator_profiles" ADD COLUMN "links" JSONB NOT NULL DEFAULT '[]';

-- Step 2: Migrate existing data to the new format
UPDATE "creator_profiles"
SET "links" = (
  SELECT jsonb_agg(link) FILTER (WHERE link IS NOT NULL)
  FROM (
    SELECT CASE WHEN "linkInstagram" IS NOT NULL THEN jsonb_build_object('type', 'instagram', 'url', "linkInstagram") END AS link
    UNION ALL
    SELECT CASE WHEN "linkTwitter" IS NOT NULL THEN jsonb_build_object('type', 'twitter', 'url', "linkTwitter") END
    UNION ALL
    SELECT CASE WHEN "linkOnlyfans" IS NOT NULL THEN jsonb_build_object('type', 'onlyfans', 'url', "linkOnlyfans") END
    UNION ALL
    SELECT CASE WHEN "linkWebsite" IS NOT NULL THEN jsonb_build_object('type', 'website', 'url', "linkWebsite") END
  ) AS subquery
)
WHERE "linkInstagram" IS NOT NULL
   OR "linkTwitter" IS NOT NULL
   OR "linkOnlyfans" IS NOT NULL
   OR "linkWebsite" IS NOT NULL;

-- Ensure empty array for profiles with no links (fix any NULLs from the aggregation)
UPDATE "creator_profiles" SET "links" = '[]' WHERE "links" IS NULL;

-- Step 3: Drop the old columns
ALTER TABLE "creator_profiles" DROP COLUMN "linkInstagram";
ALTER TABLE "creator_profiles" DROP COLUMN "linkTwitter";
ALTER TABLE "creator_profiles" DROP COLUMN "linkOnlyfans";
ALTER TABLE "creator_profiles" DROP COLUMN "linkWebsite";
