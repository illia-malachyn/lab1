import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module';
import { LightSensorsModule } from './light-sensors/light-sensors.module';
import { TemperatureSensorsController } from './temperature-sensors/temperature-sensors.controller';
import { LightSensorsController } from './light-sensors/light-sensors.controller';
import { TemperatureSensorsService } from './temperature-sensors/temperature-sensors.service';
import { LightSensorsService } from './light-sensors/light-sensors.service';

@Module({
  imports: [TemperatureSensorsModule, HumiditySensorsModule, LightSensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
