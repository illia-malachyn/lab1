import { Module } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { TemperatureSensorsController } from './temperature-sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureSensor])],
  controllers: [TemperatureSensorsController],
  providers: [TemperatureSensorsService],
})
export class TemperatureSensorsModule { }
