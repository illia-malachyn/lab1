import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './logging.middleware';
import { TemperatureSensorsModule } from './temperature-sensors/temperature-sensors.module';
import { HumiditySensorsModule } from './humidity-sensors/humidity-sensors.module';
import { LightSensorsModule } from './light-sensors/light-sensors.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemperatureSensor } from './temperature-sensors/entities/temperature-sensor.entity';
import { HumiditySensor } from './humidity-sensors/entities/humidity-sensor.entity';
import { LightSensor } from './light-sensors/entities/light-sensor.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [TemperatureSensor, HumiditySensor, LightSensor],
        synchronize: false,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    TemperatureSensorsModule,
    HumiditySensorsModule,
    LightSensorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
