import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';


export interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
}

@Injectable()
export class ItemsService {
  
  private items: Item[] = []; 

  findAll(): Item[] {
    return this.items;
  }

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: Date.now(), // Temporary ID
      ...createItemDto,
    };
    this.items.push(newItem); 
    return newItem;
  }
}