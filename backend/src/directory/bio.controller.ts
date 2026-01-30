import { Controller, Get, Param } from '@nestjs/common';
import { DirectoryService } from './directory.service';

@Controller('bio')
export class BioController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get(':username')
  async getPublicProfile(@Param('username') username: string) {
    return this.directoryService.findByUsername(username);
  }
}
