import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class CreatorsController {
  constructor(private readonly creatorsService: CreatorsService) {}

  @Get()
  async getProfile(@CurrentUser('sub') userId: string) {
    const profile = await this.creatorsService.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @Post()
  async createProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    return this.creatorsService.create(userId, dto);
  }

  @Put()
  async updateProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.creatorsService.update(userId, dto);
  }

  @Get('exists')
  async checkProfileExists(@CurrentUser('sub') userId: string) {
    const exists = await this.creatorsService.hasProfile(userId);
    return { exists };
  }
}
