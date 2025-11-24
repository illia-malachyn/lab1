import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemperatureSensorDto } from './dto/create-temperature-sensor.dto';
import { UpdateTemperatureSensorDto } from './dto/update-temperature-sensor.dto';
import { TemperatureSensor } from './entities/temperature-sensor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TemperatureSensorsService {
  constructor(
    @InjectRepository(TemperatureSensor)
    private readonly temperatureSensorRepository:
      Repository<TemperatureSensor>,
  ) { }

  async create(createSensorDto: CreateTemperatureSensorDto) {
    const record =
      this.temperatureSensorRepository.create(createSensorDto);
    return await this.temperatureSensorRepository.save(record);
  }

  async findAll() {
    return await this.temperatureSensorRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: string) {
    return await this.temperatureSensorRepository.find({
      where: { id },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async update(id: string, updateSensorDto: UpdateTemperatureSensorDto) {
    return await this.temperatureSensorRepository.update(id, updateSensorDto);
  }

  async remove(id: string) {
    return await this.temperatureSensorRepository.delete(id);
  }
}
