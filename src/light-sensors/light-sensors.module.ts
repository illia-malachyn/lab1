import { Module } from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service';
import { LightSensorsController } from './light-sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightSensor } from './entities/light-sensor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LightSensor])],
  controllers: [LightSensorsController],
  providers: [LightSensorsService],
})
export class LightSensorsModule { }
