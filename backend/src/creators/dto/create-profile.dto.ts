import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
  MaxLength,
  MinLength,
  Matches,
  ArrayMaxSize,
} from 'class-validator';

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
  @IsUrl()
  @MaxLength(255)
  linkInstagram?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  linkTwitter?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  linkOnlyfans?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  linkWebsite?: string;
}
