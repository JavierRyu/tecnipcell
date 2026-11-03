import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../prisma/db.js';
import { CrearFichaDto } from './dto/crear-ficha.dto.js';

@Injectable()
export class FichasService {

    findAll() {
        return db.orm.public.Ficha.all();
    }

    async create(data: CrearFichaDto) {
        try {
        return await db.orm.public.Ficha.create(data);
        } catch (error) {
        if ((error as { sqlState?: string }).sqlState === '23503') {
            throw new NotFoundException('El cliente no existe');
        }
        throw error;
        }
    }

}