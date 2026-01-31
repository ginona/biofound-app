import { Module } from '@nestjs/common';
import { BioController } from './bio.controller';
import { DirectoryController } from './directory.controller';
import { DirectoryService } from './directory.service';

@Module({
  controllers: [DirectoryController, BioController],
  providers: [DirectoryService],
})
export class DirectoryModule {}
