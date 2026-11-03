import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CrearFichaDto {
    @IsInt()
    clienteId!: number;

    @IsString()
    @IsNotEmpty()
    dispositivo!: string;

    @IsString()
    @IsNotEmpty()
    marca!: string;

    @IsString()
    @IsNotEmpty()
    modelo!: string;

    @IsString()
    @IsNotEmpty()
    servicio!: string;

    @IsString()
    @IsNotEmpty()
    problema!: string;

    @IsOptional()
    @IsString()
    imei?: string;

    @IsOptional()
    @IsString()
    bloqueo?: string;

    @IsOptional()
    @IsString()
    observaciones?: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    costo?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    anticipo?: number;
}