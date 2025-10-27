import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './logging.middleware';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module';
import { LightSensorsModule } from './light-sensors/light-sensors.module';

@Module({
  imports: [TemperatureSensorsModule, HumiditySensorsModule, LightSensorsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
