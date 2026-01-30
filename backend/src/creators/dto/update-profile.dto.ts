import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUrl,
  MaxLength,
  ArrayMaxSize,
} from 'class-validator';

// Username is immutable, so it's not included in update DTO
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category?: string;

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
