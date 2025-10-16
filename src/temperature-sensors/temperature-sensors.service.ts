import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class TemperatureSensorsService {
  private sensors: TemperatureSensor[] = [];

  create(createSensorDto: CreateTemperatureSensorDto) {
    const sensor: TemperatureSensor = {
      ...createSensorDto,
      id: uuidv4(),
      timestamp: new Date(),
    };

    this.sensors.push(sensor);
    return sensor;
  }

  findAll() {
    return this.sensors
  }

  findOne(id: string) {
    const sensor = this.sensors.find((s) => s.id === id);
    if (!sensor)
      throw new NotFoundException(`sensor with id ${id} not found`);

    return sensor;
  }

  update(id: string, updateSensorDto: UpdateTemperatureSensorDto) {
    const sensor = this.findOne(id);
    Object.assign(sensor, updateSensorDto);

    return sensor;
  }

  remove(id: string) {
    const sensor = this.findOne(id);
    this.sensors = this.sensors.filter((s) => s.id !== sensor.id);
  }
}
