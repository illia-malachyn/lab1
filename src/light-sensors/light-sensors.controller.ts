import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LightSensorsService } from './light-sensors.service';
import { CreateLightSensorDto } from './dto/create-light-sensor.dto';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto';

@Controller('light-sensors')
export class LightSensorsController {
  constructor(private readonly service: LightSensorsService) {}

  @Post()
  create(@Body() dto: CreateLightSensorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLightSensorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
