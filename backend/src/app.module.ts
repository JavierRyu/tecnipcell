import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { FichasModule } from './fichas/fichas.module.js';

@Module({
  imports: [ClientesModule, FichasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
