import { Controller, Get, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Get()
  async search(@Query() query: SearchQueryDto) {
    return this.directoryService.search(query);
  }
}
