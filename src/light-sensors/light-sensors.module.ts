import { Module } from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service';
import { LightSensorsController } from './light-sensors.controller';

@Module({
  controllers: [LightSensorsController],
  providers: [LightSensorsService],
})
export class LightSensorsModule {}
