import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
  IsInt,
  Min,
  Max,
  MaxLength,
  MinLength,
  Matches,
  ArrayMaxSize,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LinkDto {
  @IsString()
  @IsIn([
    'instagram',
    'twitter',
    'tiktok',
    'onlyfans',
    'fansly',
    'youtube',
    'twitch',
    'linkedin',
    'github',
    'website',
    'custom',
  ])
  type: string;

  @IsUrl({}, { message: 'Please enter a valid URL (e.g., https://instagram.com/username)' })
  @MaxLength(500)
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  label?: string;
}

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-z0-9_]+$/, {
    message: 'Username must be lowercase alphanumeric with underscores only',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  displayName: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @MaxLength(30, { each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDto)
  @ArrayMaxSize(10)
  links?: LinkDto[];

  // SEO Fields
  @IsOptional()
  @IsString()
  @MaxLength(60)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  seoDescription?: string;

  @IsOptional()
  @IsString()
  @MinLength(100)
  longBio?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  backgroundTheme?: number;
}
