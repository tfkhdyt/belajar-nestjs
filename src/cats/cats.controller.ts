import { Controller, Get, Header, HttpCode, Post, Redirect, Query, Param, Body } from '@nestjs/common';
import {CreateCatDto} from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return {
      message: 'Cat added successfully',
      name: createCatDto.name,
      age: createCatDto.age,
      breed: createCatDto.breed
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number | string): string {
    return `This action returns a ${id} cat`
  }

  @Get()
  findAll(): string {
    return `This action returns all cats`
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
