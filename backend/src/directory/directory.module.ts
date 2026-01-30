import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfile } from '../creators/creator-profile.entity';
import { BioController } from './bio.controller';
import { DirectoryController } from './directory.controller';
import { DirectoryService } from './directory.service';

@Module({
  imports: [TypeOrmModule.forFeature([CreatorProfile])],
  controllers: [DirectoryController, BioController],
  providers: [DirectoryService],
})
export class DirectoryModule {}
