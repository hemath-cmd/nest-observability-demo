import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ResponseEnvelope } from '../common/response-envelope';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully' })
  create(@Body() createItemDto: CreateItemDto) {
    const item = this.itemsService.create(createItemDto);
    return new ResponseEnvelope(item, 'Item created successfully');
  } // <-- இந்த } மிஸ்ஸிங் ஆகிருச்சு

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  findAll() {
    const items = this.itemsService.findAll();
    return new ResponseEnvelope(items, 'Items fetched successfully');
  }
}