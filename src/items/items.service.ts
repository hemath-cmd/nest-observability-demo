import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

// 1. Item-க்கு Type Define பண்ணு
export interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
}

@Injectable()
export class ItemsService {
  // 2. இங்க Type குடுத்தாச்சு Item[]
  private items: Item[] = []; 

  findAll(): Item[] {
    return this.items;
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: Date.now(), // Temporary ID
      ...createItemDto,
    };
    this.items.push(newItem); // இப்போ Error வராது
    return newItem;
  }
}