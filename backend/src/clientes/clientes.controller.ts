import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { ClientesService } from './clientes.service.js';
import { CrearClienteDto } from './dto/crear-cliente.dto.js';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Get()
    findAll() {
        return this.clientesService.findAll();
    }

    @Post()
    create(@Body() body: CrearClienteDto) {
        return this.clientesService.create(body);
    }

    @Get('cedula/:cedula')
    findByCedula(@Param('cedula') cedula: string) {
        return this.clientesService.findByCedula(cedula);
    }

}


