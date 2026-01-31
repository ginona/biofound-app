import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatorProfile } from '@prisma/client';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class CreatorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<CreatorProfile | null> {
    return this.prisma.creatorProfile.findUnique({ where: { userId } });
  }

  async findByUsername(username: string): Promise<CreatorProfile | null> {
    return this.prisma.creatorProfile.findUnique({ where: { username } });
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

    return this.prisma.creatorProfile.create({
      data: {
        userId,
        username: dto.username.toLowerCase(),
        displayName: dto.displayName,
        bio: dto.bio || null,
        category: dto.category,
        tags: dto.tags || [],
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
      },
    });
  }

  async update(
    userId: string,
    dto: UpdateProfileDto,
  ): Promise<CreatorProfile> {
    const profile = await this.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.prisma.creatorProfile.update({
      where: { userId },
      data: {
        ...(dto.displayName !== undefined && { displayName: dto.displayName }),
        ...(dto.bio !== undefined && { bio: dto.bio || null }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.tags !== undefined && { tags: dto.tags || [] }),
        ...(dto.city !== undefined && { city: dto.city || null }),
        ...(dto.country !== undefined && { country: dto.country || null }),
        ...(dto.linkInstagram !== undefined && { linkInstagram: dto.linkInstagram || null }),
        ...(dto.linkTwitter !== undefined && { linkTwitter: dto.linkTwitter || null }),
        ...(dto.linkOnlyfans !== undefined && { linkOnlyfans: dto.linkOnlyfans || null }),
        ...(dto.linkWebsite !== undefined && { linkWebsite: dto.linkWebsite || null }),
        ...(dto.seoTitle !== undefined && { seoTitle: dto.seoTitle || null }),
        ...(dto.seoDescription !== undefined && { seoDescription: dto.seoDescription || null }),
        ...(dto.longBio !== undefined && { longBio: dto.longBio || null }),
        ...(dto.backgroundTheme !== undefined && { backgroundTheme: dto.backgroundTheme }),
      },
    });
  }

  async hasProfile(userId: string): Promise<boolean> {
    const count = await this.prisma.creatorProfile.count({ where: { userId } });
    return count > 0;
  }
}
