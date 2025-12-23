import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, MessageEvent } from '@nestjs/common';
import { HumiditySensorsService } from './humidity-sensors.service';
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { HumidityAlertsService } from './humidity-alerts.service';
import { Observable, map } from 'rxjs';

@Controller('humidity-sensors')
export class HumiditySensorsController {
  constructor(
    private readonly service: HumiditySensorsService,
    private readonly alertsService: HumidityAlertsService,
  ) {}

  @Post()
  create(@Body() dto: CreateHumiditySensorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Sse('alerts')
  alerts(): Observable<MessageEvent> {
    return this.alertsService.getAlertStream().pipe(
      map((alert) => ({
        data: alert,
      })),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHumiditySensorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
