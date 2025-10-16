import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateLightSensorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  luminosity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsOptional()
  timestamp?: Date;
}
