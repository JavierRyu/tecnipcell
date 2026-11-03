import { Body, Controller, Get, Post } from '@nestjs/common';
import { FichasService } from './fichas.service.js';
import { CrearFichaDto } from './dto/crear-ficha.dto.js';

@Controller('fichas')
export class FichasController {
  constructor(private readonly fichasService: FichasService) {}

  @Get()
  findAll() {
    return this.fichasService.findAll();
  }

  @Post()
  create(@Body() body: CrearFichaDto) {
    return this.fichasService.create(body);
  }
}
