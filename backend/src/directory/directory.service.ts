import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorProfile } from '../creators/creator-profile.entity';
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
  constructor(
    @InjectRepository(CreatorProfile)
    private readonly profileRepository: Repository<CreatorProfile>,
  ) {}

  async search(query: SearchQueryDto): Promise<PaginatedResult<CreatorProfile>> {
    const { q, category, country, city, tag, page = 1, limit = 20 } = query;

    const qb = this.profileRepository.createQueryBuilder('profile');

    // Keyword search (display_name, bio, tags)
    if (q) {
      qb.andWhere(
        '(profile.displayName ILIKE :q OR profile.bio ILIKE :q OR :q = ANY(profile.tags))',
        { q: `%${q}%` },
      );
    }

    // Filter by category
    if (category) {
      qb.andWhere('profile.category = :category', { category });
    }

    // Filter by country
    if (country) {
      qb.andWhere('profile.country ILIKE :country', { country: `%${country}%` });
    }

    // Filter by city
    if (city) {
      qb.andWhere('profile.city ILIKE :city', { city: `%${city}%` });
    }

    // Filter by specific tag
    if (tag) {
      qb.andWhere(':tag = ANY(profile.tags)', { tag });
    }

    // Get total count
    const total = await qb.getCount();

    // Apply pagination
    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    // Order by most recent
    qb.orderBy('profile.createdAt', 'DESC');

    const data = await qb.getMany();

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
    const profile = await this.profileRepository.findOne({
      where: { username: username.toLowerCase() },
    });

    if (!profile) {
      throw new NotFoundException('Creator not found');
    }

    return profile;
  }
}
