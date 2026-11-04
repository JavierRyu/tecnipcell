import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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

    @IsOptional()
    @IsBoolean()
    hardware?: boolean;

    @IsOptional()
    @IsBoolean()
    software?: boolean;

    @IsOptional()
    @IsBoolean()
    diagnostico?: boolean;

    @IsOptional()
    @IsBoolean()
    reparacion?: boolean;

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