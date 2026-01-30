import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorProfile } from './creator-profile.entity';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(CreatorProfile)
    private readonly profileRepository: Repository<CreatorProfile>,
  ) {}

  async findByUserId(userId: string): Promise<CreatorProfile | null> {
    return this.profileRepository.findOne({ where: { userId } });
  }

  async findByUsername(username: string): Promise<CreatorProfile | null> {
    return this.profileRepository.findOne({ where: { username } });
  }

  async create(
    userId: string,
    dto: CreateProfileDto,
  ): Promise<CreatorProfile> {
    // Check if user already has a profile
    const existingProfile = await this.findByUserId(userId);
    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }

    // Check if username is taken
    const existingUsername = await this.findByUsername(dto.username);
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    const profile = this.profileRepository.create({
      userId,
      username: dto.username.toLowerCase(),
      displayName: dto.displayName,
      bio: dto.bio || null,
      category: dto.category,
      tags: dto.tags || null,
      city: dto.city || null,
      country: dto.country || null,
      linkInstagram: dto.linkInstagram || null,
      linkTwitter: dto.linkTwitter || null,
      linkOnlyfans: dto.linkOnlyfans || null,
      linkWebsite: dto.linkWebsite || null,
      seoTitle: dto.seoTitle || null,
      seoDescription: dto.seoDescription || null,
      longBio: dto.longBio || null,
      backgroundTheme: dto.backgroundTheme ?? 0,
    });

    return this.profileRepository.save(profile);
  }

  async update(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<CreatorProfile> {
    const profile = await this.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Update only provided fields
    if (dto.displayName !== undefined) profile.displayName = dto.displayName;
    if (dto.bio !== undefined) profile.bio = dto.bio || null;
    if (dto.category !== undefined) profile.category = dto.category;
    if (dto.tags !== undefined) profile.tags = dto.tags || null;
    if (dto.city !== undefined) profile.city = dto.city || null;
    if (dto.country !== undefined) profile.country = dto.country || null;
    if (dto.linkInstagram !== undefined) profile.linkInstagram = dto.linkInstagram || null;
    if (dto.linkTwitter !== undefined) profile.linkTwitter = dto.linkTwitter || null;
    if (dto.linkOnlyfans !== undefined) profile.linkOnlyfans = dto.linkOnlyfans || null;
    if (dto.linkWebsite !== undefined) profile.linkWebsite = dto.linkWebsite || null;
    if (dto.seoTitle !== undefined) profile.seoTitle = dto.seoTitle || null;
    if (dto.seoDescription !== undefined) profile.seoDescription = dto.seoDescription || null;
    if (dto.longBio !== undefined) profile.longBio = dto.longBio || null;
    if (dto.backgroundTheme !== undefined) profile.backgroundTheme = dto.backgroundTheme;

    return this.profileRepository.save(profile);
  }

  async hasProfile(userId: string): Promise<boolean> {
    const count = await this.profileRepository.count({ where: { userId } });
    return count > 0;
  }
}
