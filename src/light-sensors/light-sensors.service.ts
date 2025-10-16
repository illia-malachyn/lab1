import { Injectable } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');
import { CreateLightSensorDto } from './dto/create-light-sensor.dto';
import { UpdateLightSensorDto } from './dto/update-light-sensor.dto';
import { LightSensor } from './entities/light-sensor.entity';

@Injectable()
export class LightSensorsService {
  private sensors: LightSensor[] = [];

  create(dto: CreateLightSensorDto): LightSensor {
    const sensor: LightSensor = {
      id: uuidv4(),
      ...dto,
      timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll(): LightSensor[] {
    return this.sensors;
  }


  findOne(id: string): LightSensor | undefined {
    return this.sensors.find(s => s.id === id);
  }


  update(id: string, dto: UpdateLightSensorDto): LightSensor | undefined {
    const sensor = this.findOne(id);
    if (!sensor) return undefined;
    Object.assign(sensor, dto);
    return sensor;
  }

  remove(id: string): boolean {
    const idx = this.sensors.findIndex(s => s.id === id);
    if (idx === -1) return false;
    this.sensors.splice(idx, 1);
    return true;
  }
}
