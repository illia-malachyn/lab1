import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateHumiditySensorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  humidity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsOptional()
  timestamp?: Date;
}
