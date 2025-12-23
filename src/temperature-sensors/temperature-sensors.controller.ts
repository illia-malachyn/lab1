import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, MessageEvent } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureAlertsService } from './temperature-alerts.service';
import { Observable, map } from 'rxjs';

@Controller('temperature-sensors')
export class TemperatureSensorsController {
  constructor(
    private readonly temperatureSensorsService: TemperatureSensorsService,
    private readonly alertsService: TemperatureAlertsService,
  ) {}

  @Post()
  create(@Body() createTemperatureSensorDto: CreateTemperatureSensorDto) {
    return this.temperatureSensorsService.create(createTemperatureSensorDto);
  }

  @Get()
  findAll() {
    return this.temperatureSensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temperatureSensorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemperatureSensorDto: UpdateTemperatureSensorDto) {
    return this.temperatureSensorsService.update(id, updateTemperatureSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temperatureSensorsService.remove(id);
  }

  @Sse('alerts')
  alerts(): Observable<MessageEvent> {
    return this.alertsService.getAlertStream().pipe(
      map((alert) => ({
        data: alert,
      })),
    );
  }
}
