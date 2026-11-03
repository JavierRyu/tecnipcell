import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CrearClienteDto } from './dto/crear-cliente.dto.js';

@Injectable()
export class ClientesService {

    findAll() {
        return db.orm.public.Cliente.all();
    }

    async create(data: CrearClienteDto) {
        try {
            return await db.orm.public.Cliente.create(data);
        }catch (error) {
            if ((error as { sqlState: string }).sqlState === '23505') {
                throw new ConflictException('Ya existe un cliente con esa cedula');
            }
            throw error;
        }
    }

    async findByCedula(cedula: string) {
        const cliente = await db.orm.public.Cliente.where({ cedula }).first(); 
        if (!cliente) {
            throw new NotFoundException('No existe un cliente con esa cedula');
        }   
        return cliente;
    }
    
}
