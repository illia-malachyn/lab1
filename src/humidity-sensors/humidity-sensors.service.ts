import { Injectable } from '@nestjs/common';
const { v4: uuidv4 } = require('uuid');
import { CreateHumiditySensorDto } from './dto/create-humidity-sensor.dto';
import { UpdateHumiditySensorDto } from './dto/update-humidity-sensor.dto';
import { HumiditySensor } from './entities/humidity-sensor.entity';

@Injectable()
export class HumiditySensorsService {
  private sensors: HumiditySensor[] = [];

  create(dto: CreateHumiditySensorDto): HumiditySensor {
    const sensor: HumiditySensor = {
      id: uuidv4(),
      ...dto,
      timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
    };
    this.sensors.push(sensor);
    return sensor;
  }

  findAll(): HumiditySensor[] {
    return this.sensors;
  }


  findOne(id: string): HumiditySensor | undefined {
    return this.sensors.find(s => s.id === id);
  }

  update(id: string, dto: UpdateHumiditySensorDto): HumiditySensor | undefined {
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
