import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemperatureSensorsService } from './temperature-sensors.service';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';

@Controller('temperature-sensors')
export class TemperatureSensorsController {
  constructor(private readonly temperatureSensorsService: TemperatureSensorsService) {}

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
}
