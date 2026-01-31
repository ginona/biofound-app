import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatorProfile } from '@prisma/client';
import { SearchQueryDto } from './dto/search-query.dto';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class DirectoryService {
  constructor(private readonly prisma: PrismaService) {}

  async search(query: SearchQueryDto): Promise<PaginatedResult<CreatorProfile>> {
    const { q, category, country, city, tag, page = 1, limit = 20 } = query;

    const where: any = {};

    // Keyword search (display_name, bio, tags)
    if (q) {
      where.OR = [
        { displayName: { contains: q, mode: 'insensitive' } },
        { bio: { contains: q, mode: 'insensitive' } },
        { tags: { has: q } },
      ];
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by country
    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    // Filter by city
    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    // Filter by specific tag
    if (tag) {
      where.tags = { has: tag };
    }

    // Get total count
    const total = await this.prisma.creatorProfile.count({ where });

    // Apply pagination
    const skip = (page - 1) * limit;

    const data = await this.prisma.creatorProfile.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByUsername(username: string): Promise<CreatorProfile> {
    const profile = await this.prisma.creatorProfile.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (!profile) {
      throw new NotFoundException('Creator not found');
    }

    return profile;
  }
}
