import { Module } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { TemperatureSensorsController } from './temperature-sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { TemperatureAlertsService } from './temperature-alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([TemperatureSensor])],
  controllers: [TemperatureSensorsController],
  providers: [TemperatureSensorsService, TemperatureAlertsService],
})
export class TemperatureSensorsModule { }
