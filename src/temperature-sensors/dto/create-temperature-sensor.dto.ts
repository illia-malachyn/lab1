import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTemperatureSensorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    temperature: number;

    @IsNotEmpty()
    @IsString()
    unit: string;

    @IsOptional()
    timestamp?: Date;
} 