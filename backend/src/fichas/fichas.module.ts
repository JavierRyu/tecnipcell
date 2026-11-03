import { Module } from '@nestjs/common';
import { FichasService } from './fichas.service.js';
import { FichasController } from './fichas.controller.js';

@Module({
  providers: [FichasService],
  controllers: [FichasController]
})
export class FichasModule {}
